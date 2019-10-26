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

/** Make sure to enforce uniqueness of the options
 *  1. Because its stupid to have multiple of the same thing
 *  2. They may be used as react keys
 */
export type MultichoiceRepr = {
  kind: "MCR",
  id: string,
  question: string,
  options: [string, boolean][], /** (option, isChecked) pairs; Allow multiple select */
};

// const repr: FormRepr = {
//   kind: QuestionType.ShortAnswer,
//   question: "hello",
//   options: ["f"]
// }

type PropType = {
  forms: FormRepr[],  
  dispatch: React.Dispatch<FormAction>,
  editable: boolean,
};

/** Questionnaire edit component 
 *  Probably need to pass a mode flag or something to this component and all the subcomponents indicating whether to allow editing or not
*/
const QEdit: React.FC<PropType> = ({ forms, dispatch, editable }) => {
  
  const render = (repr: FormRepr) => {
    switch (repr.kind) {
      case "MCR": return <MultichoiceQ dispatch={dispatch} key={repr.id} formRepr={repr} editable={editable} />
      case "SAR": return <ShortAnswerQ dispatch={dispatch} key={repr.id} formRepr={repr} editable={editable} />
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


