import React, { useReducer, useState } from 'react';
import { Button } from 'react-bootstrap';
import uuid from 'uuid/v4';
import { QEdit, QuestionSelection } from '../components';
import { FormRepr, MultichoiceRepr, QuestionType, ShortAnswerRepr, RateFormRepr, RankFormRepr } from '../components/QEdit';
import multichoiceicon from '../images/multiple_choice_icon1.png';
import checkboxicon from '../images/multiple_select_icon.png';
import staricon from '../images/star_icon.png';
import rankicon from '../images/up_and_down.png';
import shortanswericon from '../images/written_type_icon.png';
import { useDispatch } from 'react-redux';
import { saveForm } from '../actions/actionCreaters';

/** Array of tuples of (QType, icon, defaultFormRepr) 
 * Wrap the FormRepr in a thunk so the uuid() is unique each time
 * Actually, make id a parameter so its even more abstract
*/

// type PairWithFalseType<T> = (xs: T[]) => [T, boolean][];
// const pairWithDefault = (xs, d) => xs.map(x => [x, d]);
// const pairWithFalse = xs => pairWithDefault(xs, false);
// const wrapId = xs => xs.map(val => ({ val, id: uuid() }));

/** Wrap the defaults in a thunk so the ids are different each time */
const generateMCQDefaults: () => [string, boolean, string][] = () => [
  ["Option W", false, uuid()], 
  ["Option X", false, uuid()],
  ["Option Y", false, uuid()],
  ["Option Z", false, uuid()],
];

const generatedefaultRankOptions: () => [string, string][] = () => [
  ["Rank Option A", uuid()],
  ["Rank Option B", uuid()],
  ["Rank Option C", uuid()],
  ["Rank Option D", uuid()],
];

const questionData: [QuestionType, string, (id: string) => FormRepr][] = [
  [QuestionType.MultiChoice, multichoiceicon,
    id => ({ kind: "MCR", id, question: "", defaultQuestion: "Write Your Multichoice Question Here", mutex: true, options: generateMCQDefaults() })],
  [QuestionType.Checkboxes, checkboxicon,
    id => ({ kind: "MCR", id, question: "", defaultQuestion: "Write Your Checkbox Question Here", mutex: false, options: generateMCQDefaults() })],
  [QuestionType.RateOption, staricon,
    id => ({ kind: "RTR", id: uuid(), question: "", defaultQuestion: "Write Your Rating Question Here", rating: 0 })],
  [QuestionType.Rank, rankicon,
    id => ({ kind: "RNKR", id: uuid(), question: "", defaultQuestion: "Write Your Rank Answer Question Here", options: generatedefaultRankOptions() })],
  [QuestionType.ShortAnswer, shortanswericon,
    id => ({ kind: "SAR", id: uuid(), question: "", defaultQuestion: "Write Your Short Answer Question Here", answer: "" })],
];

/** Non Optional Fields for Form Actions are:
 * formid
 *  type;
 */
export type FormAction
  = SetShortAnswerAction
  | AddFormAction
  | SetCheckboxStatusAction
  | UpdateOptionAction
  | UpdateRatingAction
  | SetQuestionAction
  | ReorderRankAction
  | AddOptionAction
  | RemoveOptionAction;

export type SetShortAnswerAction = {
  type: "SET_SHORT_ANSWER",
  formId: string,
  answer: string,
}

export type AddFormAction = {
  type: "ADD_FORM",
  formId: string,
  form: FormRepr,
}

export type SetQuestionAction = {
  type: "SET_QUESTION",
  formId: string,
  question: string,
}

/** Check or uncheck the flag belonging to the string 'option' */
export type SetCheckboxStatusAction = {
  type: "SET_CHECK_BOX_STATUS",
  index: number,
  status: boolean,
  formId: string,
};

/** Changes the option of the checkbox 
 *  Uses index to identify the element as the string has changed
*/
export type UpdateOptionAction = {
  type: "UPDATE_OPTION",
  formId: string,
  newOption: string,
  index: number,
};

export type UpdateRatingAction = {
  type: "UPDATE_RATING",
  formId: string,
  rating: number,
};

export type ReorderRankAction = {
  type: "REORDER_RANK",
  sourceIndex: number,
  destIndex: number,
  formId: string,
};

export type AddOptionAction = {
  type: "ADD_OPTION",
  formId: string,
  elem: any,
};

export type RemoveOptionAction = {
  type: "REMOVE_OPTION",
  formId: string,
  index: number,
};


type ReducerType = (state: FormRepr[], action: FormAction) => FormRepr[];

/** Assume the user sends non-retarded actions (i.e. uses an action from a suitable type of FormRepr) */
const reducer: ReducerType = (state, action) => {
  const i = state.findIndex(repr => repr.id === action.formId);
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

    /** Do it by index because there might be duplicate options */
    case "SET_CHECK_BOX_STATUS": {
      const { index, status } = action;
      const newRepr: MultichoiceRepr = { ...repr as MultichoiceRepr };
      // Set all to false first if mutex
      if (newRepr.mutex) newRepr.options = newRepr.options.map(([q, _, id]) => [q, false, id]);
      newRepr.options[index][1] = status; // Tuples are mutable in ts
      return Object.assign([...state], { [i]: newRepr });
    }

    case "UPDATE_OPTION": {
      const { index, newOption } = action;
      if (repr.kind === "MCR" || repr.kind === "RNKR") 
        repr.options[index][0] = newOption;
      return Object.assign([...state], { [i]: repr });
    }

    case "REORDER_RANK": {
      const { sourceIndex, destIndex } = action;      
      const newRepr = { ...repr as RankFormRepr };
      const tmp = newRepr.options.splice(sourceIndex, 1);
      newRepr.options.splice(destIndex, 0, tmp[0]);
      return Object.assign([...state, { [i]: newRepr }])
    } 

    case "ADD_OPTION": {
      const { elem } = action;
      if (repr.kind === "MCR")
        repr.options = [...repr.options, [elem, false, uuid()]];
      else if (repr.kind === "RNKR")
        repr.options = [...repr.options, [elem, uuid()]];

      return Object.assign([...state], { [i]: repr });
    }

    case "REMOVE_OPTION": {
      const { index } = action;
      if (repr.kind != "MCR") return state;
      repr.options.splice(index, 1);;
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
  const [formLabel, setFormLabel] = useState<string>("");
  const reduxDispatch = useDispatch();


  return (
    <>
      <Button onClick={() => console.log(forms)}>Print (console.log) Form State (Debug)</Button>
      <Button onClick={() => setEditable(!editable)}>Toggle Editable (Testing Purpose Only)</Button>
      <h6>Editable? (for debug): {editable.toString()}</h6>
      <input placeholder="Form label" value={formLabel} onChange={e => setFormLabel(e.target.value)} />
      <div className="flex-container">
        <QuestionSelection dispatch={dispatch} questionData={questionData} />
        <QEdit editable={editable} dispatch={dispatch} forms={forms} />
      </div>
      
      {/** Temporarily save to redux store for now */}
      <Button onClick={() => reduxDispatch(saveForm(formLabel, forms))}>Save</Button>
      <Button>Send To</Button>
    </>
  );
};

export default QEditContainer;