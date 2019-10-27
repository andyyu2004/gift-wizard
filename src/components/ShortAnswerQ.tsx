import React from 'react'
import { ShortAnswerRepr } from './QEdit';
import { FormAction } from '../containers/QEditContainer';
import { setQuestion, setShortAnswer } from '../actions/actionCreaters';
import { Question } from '.';

type PropType = {
  formRepr: ShortAnswerRepr,
  dispatch: React.Dispatch<FormAction>,
  editable: boolean,
};

const ShortAnswerQ: React.FC<PropType> = ({ formRepr, dispatch, editable }) => {
  const { answer, question } = formRepr;
  return (
    <>
      <Question formRepr={formRepr} dispatch={dispatch} editable={editable} />
      <input type="text" onChange={e => dispatch(setShortAnswer(e.target.value, formRepr.id))} value={answer} />
      <br />
    </>
  );
};

export default ShortAnswerQ;