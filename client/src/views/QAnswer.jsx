import React, { useReducer } from 'react';
import formReducer from '../reducers/formReducer';
import { QEditContainer } from '../containers';

const QAnswer = props => {
  
  const starterQuestionnaire = props.location && props.location.state && props.location.state.questionnaire;
  /** Workaround to destructuring undefined */
  const { forms: starterForms, label, background } = starterQuestionnaire || {};

  const [forms, dispatch] = useReducer(formReducer, starterForms || []);
  console.log("???", forms, dispatch);

  return (
    <div>
      <div className="step2">
        <div className= "title">
          <span>Title: </span>
        </div>
        <QEditContainer dispatch={dispatch} questionnaire={{ label, forms, background }} allowEditable={false} />
      </div>
    </div>
  );
};

export default QAnswer;
