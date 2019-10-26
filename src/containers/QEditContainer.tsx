import React, { useReducer } from 'react';
import { Button } from 'react-bootstrap';
import uuid from 'uuid/v1';
import { QEdit, QuestionSelection } from '../components';
import { FormRepr, QuestionType, ShortAnswerRepr } from '../components/QEdit';
import multichoiceicon from '../images/multiple_choice_icon1.png';
import checkboxicon from '../images/multiple_select_icon.png';
import questionmarkicon from '../images/question_mark.png';
import staricon from '../images/star_icon.png';
import rankicon from '../images/up_and_down.png';
import shortanswericon from '../images/written_type_icon.png';

/** Array of tuples of (QType, icon, defaultFormRepr) 
 * Wrap the FormRepr in a thunk so the uuid() is unique each time
 * Actually, make id a parameter so its even more abstract
*/
const questionData: [QuestionType, string, (id: string) => FormRepr][] = [
  [QuestionType.MultiChoice, multichoiceicon, id => ({ kind: "MCR", id, question: "Write Your Multichoice Question Here", options: ["Option A", "Option B", "Option C", "Option D"] })], 
  [QuestionType.Rank, rankicon, id => ({ kind: "MCR", id, question: "Write Your Multichoice Question Here", options: ["Option A", "Option B", "Option C", "Option D"] })],
  [QuestionType.ShortAnswer, shortanswericon, id => ({ kind: "SAR", id: uuid(), question: "Write Your Short Answer Question Here", answer: "Write Answer Here" })],
  [QuestionType.RateOption, staricon, id => ({ kind: "MCR", id, question: "Write Your Multichoice Question Here", options: ["Option A", "Option B", "Option C", "Option D"] })],
  [QuestionType.Checkboxes, checkboxicon, id => ({ kind: "MCR", id, question: "Write Your Multichoice Question Here", options: ["Option A", "Option B", "Option C", "Option D"] })],
  [QuestionType.TrueFalse, questionmarkicon, id => ({ kind: "MCR", id, question: "Write Your Multichoice Question Here", options: ["Option A", "Option B", "Option C", "Option D"] })],
];

export type FormAction 
  = SetShortAnswerAction
  | AddFormAction
  | SetShortAnswerQuestionAction;

export type SetShortAnswerAction = {
  type: "SET_SHORT_ANSWER",
  form: FormRepr,
  answer: string,
}

export type AddFormAction = {
  type: "ADD_FORM",
  form: FormRepr,
}

export type SetShortAnswerQuestionAction = {
  type: "SET_SHORT_ANSWER_QUESTION",
  form: FormRepr,
  question: string,
}

type ReducerType = (state: FormRepr[], action: FormAction) => FormRepr[];

/** Assume the user sends non-retarded actions (i.e. uses an action for a suitable type of formrepr) */
const reducer: ReducerType = (state, action) => {
  const i = state.findIndex(repr => repr.id === action.form.id);
  const repr: FormRepr = state[i];
  switch (action.type) {
    case "SET_SHORT_ANSWER": {
      const { answer } = action;
      const newRepr: ShortAnswerRepr = {
        ...repr as ShortAnswerRepr,
        answer,
      };
      return Object.assign([...state], { [i]: newRepr });
    }

    case "ADD_FORM": {
      return [...state, action.form];
    }

    case "SET_SHORT_ANSWER_QUESTION": {
      const { question } = action;
      const newRepr: ShortAnswerRepr = {
        ...repr as ShortAnswerRepr,
        question,
      };
      return Object.assign([...state], { [i]: newRepr });
    }

    default: return state;
  };

};

const QEditContainer = props => {
  // const [forms, setForms] = useState<FormRepr[]>([]);
  // const addForm = (form: FormRepr) => setForms([...forms, form]);
  
  const [forms, dispatch] = useReducer<ReducerType>(reducer, []);

  return (
    <div className="flex-container">
      <Button onClick={() => {}} style={{width: "10px", textOrientation:"sideways"}} />
      <QuestionSelection dispatch={dispatch} questionData={questionData} />
      <QEdit dispatch={dispatch} forms={forms} />
    </div>
  );
};

export default QEditContainer;