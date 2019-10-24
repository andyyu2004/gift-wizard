import React, { useState, Dispatch } from 'react'
import { QuestionSelection, QEdit } from '../components';

import multichoiceicon from '../images/multiple_choice_icon1.png';
import rankicon from '../images/up_and_down.png';
import shortanswericon from '../images/written_type_icon.png';
import staricon from '../images/star_icon.png';
import checkboxicon from '../images/multiple_select_icon.png';
import questionmarkicon from '../images/question_mark.png';

enum QuestionType {
  MultiChoice = "Multiple Choice",
  Rank        = "Rank Options", /** Rank multiple options */
  ShortAnswer = "Short Answer",
  RateOption  = "Rate Option", /** Rate 1-10 for ONE option */ 
  Checkboxes  = "Checkboxes",
  TrueFalse   = "True / False",
}

/** TODO: Replace the paragraphs with the actual components */
const typeImageMap = [
  [QuestionType.MultiChoice, multichoiceicon, <p>Multichoice Question Component</p>], 
  [QuestionType.Rank, rankicon, <p>Rank Question Component</p>],
  [QuestionType.ShortAnswer, shortanswericon, <p>Short Answer Question Component</p>],
  [QuestionType.RateOption, staricon, <p>Rate Question Component</p>],
  [QuestionType.Checkboxes, checkboxicon, <p>Checkbox Question Component</p>],
  [QuestionType.TrueFalse, questionmarkicon, <p>True False Question Component</p>],
];

const QEditContainer = props => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = question => {
    const newQuestions = [...questions];
    newQuestions.push(question);
    setQuestions(newQuestions);
  };

  return (
    <div className="flex-container">
      <QuestionSelection addQuestion={addQuestion} questions={typeImageMap} />
      <QEdit>{questions}</QEdit>
    </div>
  );
};

export default QEditContainer;