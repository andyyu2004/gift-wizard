/**
 * Questionnaire creation page
 */
import { RouteComponentProps } from '@reach/router';
import React, { useReducer, useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { FormRepr, MultichoiceRepr, Questionnaire, RankFormRepr, RateFormRepr, ShortAnswerRepr, User, UserType } from 'shared/types';
import uuid from 'uuid/v4';
import API from '../api';
import { ThemeSelection } from '../components';
import { withProtection } from '../components/hoc';
import { QEditContainer } from '../containers';
import { FormAction } from '../types/FormActions';
import './QCreate.css';
import { useSelector } from 'react-redux';
import { AppState } from '../reducers';
import Popup from 'reactjs-popup';
import useSocket from '../hooks/useSocket';

type ReducerType = (state: FormRepr[], action: FormAction) => FormRepr[];

/** Assume the user sends non-retarded actions (i.e. uses an action from a suitable type of FormRepr) */
const reducer: ReducerType = (state, action) => {
  const i = state.findIndex(repr => repr.id === action.formId);
  const repr: FormRepr = state[i];
  switch (action.type) {

    case "SET_SHORT_ANSWER": {
      const { answer } = action;
      const newRepr = {
        ...repr as ShortAnswerRepr,
        answer,
      };
      return Object.assign([...state], { [i]: newRepr });
    }

    case "SET_QUESTION": {
      const { question } = action;
      const newRepr: FormRepr = {
        ...repr as FormRepr,
        question,
      };
      return Object.assign([...state], { [i]: newRepr });
    }

    case "ADD_FORM": return [...state, action.form];

    case "REMOVE_FORM": {
      const newState = [...state];
      newState.splice(i, 1);
      return newState;
    }

    case "UPDATE_RATING": {
      const { rating } = action;
      const newRepr = {
        ...repr as RateFormRepr,
        rating,
      };
      return Object.assign([...state], { [i]: newRepr });
    }

    /** Do it by index because there might be duplicate options */
    case "SET_CHECK_BOX_STATUS": {
      const { index, status } = action;
      const newRepr: MultichoiceRepr = { ...repr as MultichoiceRepr };
      // Set all to false first if mutex
      if (newRepr.mutex) newRepr.options = newRepr.options.map(([q, _, id]) => [q, false, id]);
      newRepr.options[index][1] = status; // Tuples are mutable in ts
      return Object.assign([...state], { [i]: newRepr });
    }

    case "UPDATE_OPTION": {
      const { index, newOption } = action;
      if (repr.kind === "MCR" || repr.kind === "RNKR") 
        repr.options[index][0] = newOption;
      return Object.assign([...state], { [i]: repr });
    }

    case "REORDER_RANK": {
      const { sourceIndex, destIndex } = action;      
      const newRepr = { ...repr as RankFormRepr };
      const tmp = newRepr.options.splice(sourceIndex, 1);
      newRepr.options.splice(destIndex, 0, tmp[0]);
      return Object.assign([...state], { [i]: newRepr })
    } 

    case "ADD_OPTION": {
      const { elem } = action;
      if (repr.kind === "MCR")
        repr.options = [...repr.options, [elem, false, uuid()]];
      else if (repr.kind === "RNKR")
        repr.options = [...repr.options, [elem, uuid()]];

      return Object.assign([...state], { [i]: repr });
    }

    case "REMOVE_OPTION": {
      const { index } = action;
      if (repr.kind !== "MCR" && repr.kind !== "RNKR") return state;
      repr.options.splice(index, 1);;
      return Object.assign([...state], { [i]: repr });
    }

    default: return state;
  };

};

/** Returns array of errors in string format */
function validateForm(label: string, form: FormRepr[]): string[] {
  const errors = [];
  if (!label) errors.push("Questionnaire must have a non-empty label");
  if (!form.length) {
    errors.push("There must be at least one question"); 
    return errors;
  }
  form.forEach(({ question }, i) => {
    if (!question) errors.push(`Form ${i + 1} must have a non-empty question`);
  });
  return errors;
};

type RouteProps = {
  starterForm?: FormRepr[]
};

type PropType = RouteComponentProps<RouteProps>;

const QCreate: React.FC<PropType> = props => {
  const starterQuestionnaire: Questionnaire = props.location && props.location.state && props.location.state.questionnaire;
  /** Workaround to destructuring undefined */
  const { forms: starterForms, label: starterLabel, background: starterBackground } = starterQuestionnaire || {};

  const user = useSelector<AppState, User>(state => state.user.user!);
  const isAdmin = user.type === UserType.Admin;

  const [forms, dispatch] = useReducer<ReducerType>(reducer, starterForms || []);
  const [label, setLabel] = useState<string>(starterLabel || "");
  const [background, setBackground] = useState<string>(starterBackground || "grey");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const socket = useSocket();
  const [friends, setFriends] = useState<User[]>([]);

  const saveForm = async () => {
    const errors = validateForm(label, forms);
    if (errors.length) return errors.forEach(err => toast.error(err));

    (await API.saveQuestionnaire({ label, forms, background }))
      .map(_ => toast.success("Saved form!"))
      .mapLeft(toast.error);
  };

  /** Adds form to the site template repository */
  const publishForm = async () => {
    const errors = validateForm(label, forms);
    if (errors.length) return errors.forEach(err => toast.error(err));
    (await API.saveRepoQuestionnaire({ label, forms, background }))
      .map(({ label }) => toast.success(`Successfully saved questionnaire ${label} to repository`))
      .mapLeft(toast.error);
  };

  const fetchFriends = async () => {
    (await API.getFriends(user._id))
      .map(setFriends)
      .mapLeft(toast.error);
  };

  const sendForm = async (userid: string, username: string) => {
    const errors = validateForm(label, forms);
    if (errors.length) return errors.forEach(err => toast.error(err));
    
    setIsPopupOpen(false);
    (await API.sendQuestionnaire({ label, forms, background }, userid))
      .map(_ => toast.success(`Successfully sent questionnaire to ${username}`))
      .mapLeft(toast.error);
  };

  return (
    <div className="questionnaire">
      <h3 className="header">Customize your questionnaire</h3>
      {/* <button type="button" className="saveForm" onClick={() => console.log({ label, forms, background })}>Print (console.log) Form State (Debug)</button> */}

      <ThemeSelection setBackground={setBackground} />
      <div className="step2">
        <h6>Step2: Design your own questions</h6>
        <div className= "title">
        <span>Title: </span>
        <input className="formlabel" placeholder=" New Questionnaire" value={label} onChange={e => setLabel(e.target.value)} />
        </div>
        <QEditContainer dispatch={dispatch} questionnaire={{ label, forms, background }} />
      </div>
      {/** Temporarily save form to redux store for now */}
      <button type="button" className="saveForm" onClick={saveForm}>Save</button>
      <button type="button" className="saveForm" onClick={() => setIsPopupOpen(true)}>Send To</button>
      {isAdmin && <button type="submit" className="saveForm" onClick={publishForm}>Publish</button>}

      <Popup open={isPopupOpen} position="right center" onClose={() => setIsPopupOpen(false)} onOpen={fetchFriends}>
        <div>
          <h5>Choose which friend to send to:</h5>
          <form>
            {friends.map(({ _id, picture, username, firstname, surname }) => 
              <div key={_id}>
                <img src={picture} style={{ width: "30px"}} />
                <button type="button" id={_id} className="generic-button" onClick={() => sendForm(_id, username!)}>{username}: {firstname} {surname}</button>
              </div>
            )}
          </form>
        </div>
      </Popup>
    </div>
  );
};


export default withProtection(QCreate);