import React, { useReducer, useState } from 'react';
import { Button } from 'react-bootstrap';
import uuid from 'uuid/v1';
import { QEdit, QuestionSelection } from '../components';
import { FormRepr, MultichoiceRepr, QuestionType, ShortAnswerRepr, RateFormRepr } from '../components/QEdit';
import multichoiceicon from '../images/multiple_choice_icon1.png';
import checkboxicon from '../images/multiple_select_icon.png';
import staricon from '../images/star_icon.png';
import rankicon from '../images/up_and_down.png';
import shortanswericon from '../images/written_type_icon.png';

/** Array of tuples of (QType, icon, defaultFormRepr) 
 * Wrap the FormRepr in a thunk so the uuid() is unique each time
 * Actually, make id a parameter so its even more abstract
*/

// type PairWithFalseType<T> = (xs: T[]) => [T, boolean][];
const pairWithDefault = (xs, d) => xs.map(x => [x, d]);
const pairWithFalse = xs => pairWithDefault(xs, false);


const questionData: [QuestionType, string, (id: string) => FormRepr][] = [
  [QuestionType.MultiChoice, multichoiceicon,
    id => ({ kind: "MCR", id, question: "Write Your Multichoice Question Here", mutex: true, options: pairWithFalse(["Option W", "Option X", "Option Y", "Option Z"]) })],
  [QuestionType.Checkboxes, checkboxicon,
    id => ({ kind: "MCR", id, question: "Write Your Checkbox Question Here", mutex: false, options: pairWithFalse(["Option A", "Option B", "Option C", "Option D"]) })],
  [QuestionType.RateOption, staricon,
    id => ({ kind: "RTR", id: uuid(), question: "Write Your Rating Question Here", rating: 0 })],
  [QuestionType.Rank, rankicon,
    id => ({ kind: "SAR", id: uuid(), question: "Write Your Short Answer Question Here", answer: "Write Answer Here" })],
  [QuestionType.ShortAnswer, shortanswericon,
    id => ({ kind: "SAR", id: uuid(), question: "Write Your Short Answer Question Here", answer: "Write Answer Here" })],
];

/** Non Optional Fields for Form Actions are:
 *  FormObject, although technically on the form.id is required currently;
 *  type;
 */
export type FormAction
  = SetShortAnswerAction
  | AddFormAction
  | SetCheckboxStatusAction
  | UpdateCheckboxOptionAction
  | UpdateRatingAction
  | SetQuestionAction;

export type SetShortAnswerAction = {
  type: "SET_SHORT_ANSWER",
  form: FormRepr,
  answer: string,
}

export type AddFormAction = {
  type: "ADD_FORM",
  form: FormRepr,
}

export type SetQuestionAction = {
  type: "SET_QUESTION",
  form: FormRepr,
  question: string,
}

/** Check or uncheck the flag belonging to the string 'option' */
export type SetCheckboxStatusAction = {
  type: "SET_CHECK_BOX_STATUS",
  option: string,
  status: boolean,
  form: FormRepr,
};

/** Changes the option of the checkbox 
 *  Uses index to identify the element as the string has changed
*/
export type UpdateCheckboxOptionAction = {
  type: "UPDATE_CHECK_BOX_OPTION",
  form: FormRepr,
  newOption: string,
  index: number,
};

export type UpdateRatingAction = {
  type: "UPDATE_RATING",
  form: FormRepr,
  rating: number,
};

type ReducerType = (state: FormRepr[], action: FormAction) => FormRepr[];

/** Assume the user sends non-retarded actions (i.e. uses an action from a suitable type of FormRepr) */
const reducer: ReducerType = (state, action) => {
  const i = state.findIndex(repr => repr.id === action.form.id);
  const repr: FormRepr = state[i];
  switch (action.type) {

    case "SET_SHORT_ANSWER": {
      const { answer } = action;
      const newRepr = {
        ...repr as ShortAnswerRepr,
        answer,
      };
      return Object.assign([...state], { [i]: newRepr });
    }

    case "SET_QUESTION": {
      const { question } = action;
      const newRepr: FormRepr = {
        ...repr as FormRepr,
        question,
      };
      return Object.assign([...state], { [i]: newRepr });
    }

    case "ADD_FORM": return [...state, action.form];

    case "UPDATE_RATING": {
      const { rating } = action;
      const newRepr = {
        ...repr as RateFormRepr,
        rating,
      };
      return Object.assign([...state], { [i]: newRepr });
    }

    case "SET_CHECK_BOX_STATUS": {
      const { option, status } = action;
      const newRepr: MultichoiceRepr = { ...repr as MultichoiceRepr };
      // Set all to false first if mutex
      if (newRepr.mutex) newRepr.options = newRepr.options.map(([q, _]) => [q, false]);
      newRepr.options.find(x => x[0] == option)[1] = status; // Tuples are mutable in ts
      return Object.assign([...state], { [i]: newRepr });
    }

    case "UPDATE_CHECK_BOX_OPTION": {
      const { index, newOption } = action;
      (repr as MultichoiceRepr).options[index][0] = newOption;
      return Object.assign([...state], { [i]: repr });
    }

    default: return state;
  };

};

const QEditContainer = props => {
  // const [forms, setForms] = useState<FormRepr[]>([]);
  // const addForm = (form: FormRepr) => setForms([...forms, form]);

  const [forms, dispatch] = useReducer<ReducerType>(reducer, []);

  const [editable, setEditable] = useState<boolean>(true);

  return (
    <>
      <Button onClick={() => console.log(forms)}>Print (console.log) Form State (Debug)</Button>
      <Button onClick={() => setEditable(!editable)}>Toggle Editable (Testing Purpose Only)</Button>
      <h6>Editable? (for debug): {editable.toString()}</h6>
      <div className="flex-container">
        <QuestionSelection dispatch={dispatch} questionData={questionData} />
        <QEdit editable={editable} dispatch={dispatch} forms={forms} />
      </div>
    </>
  );
};

export default QEditContainer;