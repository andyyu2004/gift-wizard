/**
 * Questionnaire creation page
 */
import { RouteComponentProps } from '@reach/router';
import React, { useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import { FormRepr, Questionnaire, User, UserType } from 'shared/types';
import API from '../api';
import { ThemeSelection } from '../components';
import { withProtection } from '../components/hoc';
import { QEditContainer } from '../containers';
import useSocket from '../hooks/useSocket';
import { AppState } from '../reducers';
import { TFormReducer, formReducer } from '../reducers/questionnaireReducer';
import './QCreate.css';

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

  const [forms, dispatch] = useReducer<TFormReducer>(formReducer, starterForms || []);
  const [label, setLabel] = useState<string>(starterLabel || "");
  const [background, setBackground] = useState<string>(starterBackground || "grey");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

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
        <QEditContainer dispatch={dispatch} questionnaire={{ label, forms, background }} allowEditable={true} />
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