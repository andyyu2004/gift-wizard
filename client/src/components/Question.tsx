import React from 'react';
import { setQuestion } from '../actions/actionCreaters';
import { FormAction } from "../types/FormActions";
import { FormRepr } from 'shared/types';
import "./Question.css";

type PropType = {
  formRepr: FormRepr,
  dispatch?: React.Dispatch<FormAction>,
  editable: boolean,
};

const Question: React.FC<PropType> = ({ editable, formRepr, dispatch }) => {
  const { id, question, defaultQuestion } = formRepr;
  return (
    <>
      {editable  
        ? <input className="questionbox" type="text" onChange={e => dispatch && dispatch(setQuestion(e.target.value, id))} value={question} placeholder={defaultQuestion} />
        : <span className="ques">{question}</span>}
    </>
  );
};

export default Question;