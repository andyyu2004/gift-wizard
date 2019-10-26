import React from 'react'
import { ShortAnswerRepr } from './QEdit';
import { FormAction } from '../containers/QEditContainer';
import { setShortAnswerQuestion, setShortAnswer } from '../actions/actionCreaters';

type PropType = {
  formRepr: ShortAnswerRepr,
  dispatch: React.Dispatch<FormAction>,
  editable: boolean,
};

const ShortAnswerQ: React.FC<PropType> = ({ formRepr, dispatch, editable }) => {
  const { answer, question } = formRepr;
  return (
    <>
      {editable  
        ? <input type="text" onChange={e => dispatch(setShortAnswerQuestion(e.target.value, formRepr))} value={question} />
        : <span>{question}</span>}
      <br/>
      <input type="text" onChange={e => dispatch(setShortAnswer(e.target.value, formRepr))} value={answer} />
      <br />
    </>
  );
};

export default ShortAnswerQ;