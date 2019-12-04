import React, { useReducer, useState } from 'react';
import { formReducer } from '../reducers/questionnaireReducer';
import { QEditContainer } from '../containers';
import { RouteComponentProps } from '@reach/router';
import { TFormReducer } from '../reducers/questionnaireReducer';
import { QMail } from 'shared/types';
import API from '../api';
import { toast } from 'react-toastify';

const QAnswer: React.FC<RouteComponentProps> = props => {
  
  const qmail: QMail = props.location && props.location.state && props.location.state.qmail;
  const { forms: starterForms, label, background } = qmail.questionnaire || {};

  const [forms, dispatch] = useReducer<TFormReducer>(formReducer, starterForms || []);

  const reply = async () => {
    (await API.sendQuestionnaire({ forms, label, background }, qmail.sender))
      .map(() => toast.success("Successfully replied"))
      .mapLeft(toast.error);
  };
  
  return (
    <div>
      <QEditContainer dispatch={dispatch} questionnaire={{ label, forms, background }} allowEditable={false} />
      <button type="button" className="saveForm" onClick={reply}>Reply</button>
    </div>
  );
};

export default QAnswer;
