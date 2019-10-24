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

const typeImageMap = {
  [QuestionType.MultiChoice]: multichoiceicon,
  [QuestionType.Rank]: rankicon,
  [QuestionType.ShortAnswer]: shortanswericon,
  [QuestionType.RateOption]: staricon,
  [QuestionType.Checkboxes]: checkboxicon,
  [QuestionType.TrueFalse]: questionmarkicon,
}

const QEditContainer = props => {
  const [questions, setQuestions] = useState([]);

  return (
    <div className="flex-container">
      <QuestionSelection questions={Object.entries(typeImageMap)} />
      <QEdit>{questions}</QEdit>
    </div>
  );
};

export default QEditContainer;