import React from 'react';
import { Question } from '.';
import { setShortAnswer } from '../actions/actionCreaters';
import { FormAction } from "../types/FormTypes";
import { ShortAnswerRepr } from './QEdit';
import "./ShortAnswerQ.css";

type PropType = {
  formRepr: ShortAnswerRepr,
  dispatch: React.Dispatch<FormAction>,
  editable: boolean,
};

const ShortAnswerQ: React.FC<PropType> = ({ formRepr, dispatch, editable }) => {
  const { answer } = formRepr;
  const disabled = dispatch === undefined;

  return (
    <div>
      <Question formRepr={formRepr} dispatch={dispatch} editable={editable} /><br/>
      <textarea className="shortanswertext" disabled={disabled} onChange={e => dispatch(setShortAnswer(e.target.value, formRepr.id))} placeholder="Write your answer here" value={answer} />
      <br />
    </div>
  );
};

export default ShortAnswerQ;