import React from 'react';
import { ShortAnswerQ, RateQ } from '.';
import { FormAction } from '../containers/QEditContainer';
import MultichoiceQ from './MultichoiceQ';
import './QEdit.css';

/**
 * QEdit takes some representation of a form and renders from there instead of accepting children prop directly
 * This makes it easier to save the form, as we can simply serialize some JSObject instead of HTML stuff
 */

export enum QuestionType {
  MultiChoice = "Multiple Choice",
  Checkboxes  = "Checkboxes",
  Rank        = "Rank Options", /** Rank multiple options */
  ShortAnswer = "Short Answer",
  RateOption  = "Rate Option", /** Rate 1-10 for one single option */ 
  // TrueFalse   = "True / False", // Just use multichoice for this
}

/** To determine which type, do a switch on the kind 
 * All FormRepr must have:
 * kind,
 * id,
 * question,
*/

interface IForm {
  kind: string,
  id: string,
  question: string,
}

export type FormRepr 
  = MultichoiceRepr 
  | ShortAnswerRepr
  | RankFormRepr
  | RateFormRepr;

export interface ShortAnswerRepr extends IForm {
  kind: "SAR",
  id: string,
  question: string,
  answer: string,
};

export interface MultichoiceRepr extends IForm {
  kind: "MCR",
  id: string,
  question: string,
  mutex: boolean, /** Mutually exclusive options? */
  options: [string, boolean][], /** (option, isChecked) pairs; */
};

export interface RankFormRepr extends IForm {
  kind: "RNKR",
  id: string,
  question: string,
  options: [string, number][], /** The objects to rank paired with some form of score */
};

export interface RateFormRepr extends IForm {
  kind: "RTR",
  id: string,
  question: string, /** The object to rate */
  rating: number,
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
      case "RTR": return <RateQ key={repr.id} dispatch={dispatch} formRepr={repr} editable={editable} />
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


