import React from 'react';
import uuid from 'uuid/v1';
import { ShortAnswerQ } from '.';
import MultichoiceQ from './MultichoiceQ';
import './QEdit.css';
import { FormAction } from '../containers/QEditContainer';

/**
 * QEdit takes some representation of a form and renders from there instead of accepting children prop directly
 * This makes it easier to save the form, as we can simply serialize some JSObject instead of HTML stuff
 */

export enum QuestionType {
  MultiChoice = "Multiple Choice",
  Rank        = "Rank Options", /** Rank multiple options */
  ShortAnswer = "Short Answer",
  RateOption  = "Rate Option", /** Rate 1-10 for one single option */ 
  Checkboxes  = "Checkboxes",
  TrueFalse   = "True / False",
}

/** To determine which type, do a switch on the kind */
export type FormRepr 
  = MultichoiceRepr 
  | ShortAnswerRepr;

export type ShortAnswerRepr = {
  kind: "SAR",
  id: string,
  question: string,
  answer: string,
}

export type MultichoiceRepr = {
  kind: "MCR",
  id: string,
  question: string,
  options: string[]
}

// const repr: FormRepr = {
//   kind: QuestionType.ShortAnswer,
//   question: "hello",
//   options: ["f"]
// }

type PropType = {
  forms: FormRepr[],  
  dispatch: React.Dispatch<FormAction>,
};

/** Questionnaire edit component */
const QEdit: React.FC<PropType> = ({ forms, dispatch }) => {
  
  const render = (repr: FormRepr) => {
    switch (repr.kind) {
      case "MCR": return <MultichoiceQ dispatch={dispatch} key={repr.id} formRepr={repr} />
      case "SAR": return <ShortAnswerQ dispatch={dispatch} key={repr.id} formRepr={repr} />
    }
  };

  return (
    <div className= "edit" >
      Questionnaire Edit
      <form>{forms.map(render)}</form>
    </div>
  );
}

export default QEdit;


