/**
 * Questionnaire creation page
 */
import { RouteComponentProps } from '@reach/router';
import React, { useReducer, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import uuid from 'uuid/v4';
import { saveQuestionnaire } from '../actions/actionCreaters';
import { ThemeSelection } from '../components';
import { FormRepr, MultichoiceRepr, RankFormRepr, RateFormRepr, ShortAnswerRepr } from '../components/QEdit';
import { QEditContainer } from '../containers';
import './QCreate.css';
import { FormAction, Questionnaire } from '../types/FormTypes';

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
      return Object.assign([...state, { [i]: newRepr }])
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
      if (repr.kind !== "MCR") return state;
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
  form.forEach(({question}, i) => {
    if (!question) errors.push(`Form ${i + 1} must have a non-empty question`);
  });
  return errors;
};


type RouteProps = {
  starterForm?: FormRepr[]
};

type PropType = RouteComponentProps<RouteProps>;

const QCreate: React.FC<PropType> = props => {
  const starterQuestionnaire: Questionnaire = props.location && props.location.state.questionnaire;
  /** Workaround to destructuring undefined */
  const { forms: starterForms, label: starterLabel, background: starterBackground } = starterQuestionnaire || {};

  const [forms, dispatch] = useReducer<ReducerType>(reducer, starterForms || []);
  const [label, setLabel] = useState<string>(starterLabel || "");
  const [background, setBackground] = useState<string>(starterBackground || "grey");
  const reduxDispatch = useDispatch();

  const saveFormToStore = () => {
    const errors = validateForm(label, forms);
    if (errors.length) {
      errors.forEach(err => toast.error(err));
      return;
    }
    reduxDispatch(saveQuestionnaire({ label, forms, background }));
    toast.success("Saved form!");
  };

  return (
    <div className="questionnaire">
      <h3 className="header">Customize your questionnaire</h3>

      {/* <Button onClick={() => console.log({ label, forms, background })}>Print (console.log) Form State (Debug)</Button> */}
      <ThemeSelection setBackground={setBackground} />
      <div className="step2">
        <h6>Step2: Design your own questions</h6>
        <div className= "title">
        <span>Title: </span>
        <input className="formlabel" placeholder="My Questionnaire" value={label} onChange={e => setLabel(e.target.value)} />
        </div>
        <QEditContainer dispatch={dispatch} questionnaire={{ label, forms, background }} />
      </div>
      {/** Temporarily save form to redux store for now */}
      <Button style={{ backgroundColor: "#FFFFFF", color: "#808080", borderColor: "#808080", display: "inline-block" }} onClick={() => saveFormToStore()}>Save</Button>
    </div>
  );
};


export default QCreate;