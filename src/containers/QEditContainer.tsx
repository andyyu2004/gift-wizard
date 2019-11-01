import React, { Dispatch, useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'uuid/v4';
import { QEdit, QuestionSelection } from '../components';
import { FormRepr, QuestionType } from '../components/QEdit';
import multichoiceicon from '../images/multiple_choice_icon1.png';
import checkboxicon from '../images/multiple_select_icon.png';
import staricon from '../images/star_icon.png';
import rankicon from '../images/up_and_down.png';
import shortanswericon from '../images/written_type_icon.png';
import { FormAction, Questionnaire } from "../types/FormTypes";

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


type PropType = {
  dispatch: Dispatch<FormAction>,
  questionnaire: Questionnaire,
};

const QEditContainer: React.FC<PropType> = ({ dispatch, questionnaire }) => {

  const [editable, setEditable] = useState<boolean>(true);

  return (
    <>
      {/* <Button onClick={() => setEditable(!editable)}>Toggle Editable (Testing Purpose Only)</Button>
      <h6>Editable? (for debug): {editable.toString()}</h6> */}    
      <ToastContainer position={toast.POSITION.TOP_LEFT} />
      <div className="flex-container">
        <QuestionSelection dispatch={dispatch} questionData={questionData} />
        <QEdit editable={editable} dispatch={dispatch} questionnaire={questionnaire} />
      </div>
    
      <Button style={{backgroundColor:"#66B3FF", borderColor:"#66B3FF", display: "inline-block"}} onClick={() => alert("Bit hard to even partially implement this without some form of backend")}>Send To</Button>
    </>
  );
};

export default QEditContainer;




