import React, { useState, ReactElement } from 'react'
import { QuestionSelection, QEdit, MultichoiceQ } from '../components';

import multichoiceicon from '../images/multiple_choice_icon1.png';
import rankicon from '../images/up_and_down.png';
import shortanswericon from '../images/written_type_icon.png';
import staricon from '../images/star_icon.png';
import checkboxicon from '../images/multiple_select_icon.png';
import questionmarkicon from '../images/question_mark.png';
import uuid from 'uuid/v1';

export enum QuestionType {
  MultiChoice = "Multiple Choice",
  Rank        = "Rank Options", /** Rank multiple options */
  ShortAnswer = "Short Answer",
  RateOption  = "Rate Option", /** Rate 1-10 for ONE option */ 
  Checkboxes  = "Checkboxes",
  TrueFalse   = "True / False",
}

const questionData: [QuestionType, string, () => ReactElement][] = [
  [QuestionType.MultiChoice, multichoiceicon, () => <MultichoiceQ key={uuid()} />], 
  [QuestionType.Rank, rankicon, () => <p key={uuid()}>Rank Question Component</p>],
  [QuestionType.ShortAnswer, shortanswericon, () => <p key={uuid()}>Short Answer Question Component</p>],
  [QuestionType.RateOption, staricon, () => <p key={uuid()}>Rate Question Component</p>],
  [QuestionType.Checkboxes, checkboxicon, () => <p key={uuid()}>Checkbox Question Component</p>],
  [QuestionType.TrueFalse, questionmarkicon, () => <p key={uuid()}>True False Question Component</p>],
];

const QEditContainer = props => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (question: ReactElement) => setQuestions([...questions, question]);

  return (
    <div className="flex-container">
      <QuestionSelection addQuestion={addQuestion} questionData={questionData} />
      <QEdit>{questions}</QEdit>
    </div>
  );
};

export default QEditContainer;