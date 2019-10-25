import React, { ReactElement } from 'react';
import './QuestionSelection.css';
import { QuestionType } from '../containers/QEditContainer';

type PropType = {
  questionData: [QuestionType, string, () => ReactElement][],
  addQuestion: (q: ReactElement) => void,
};

const QuestionSelection: React.FC<PropType> = ({ questionData, addQuestion }) => (
  <div className="questions">
    {questionData.map(([qtype, img, componentThunk]) => (
      <div className="question" key={qtype} onClick={() => addQuestion(componentThunk())}>
        <img src={img} style={{width:"20px"}} alt="question icon"/>
        <span className="qText">{qtype}</span>
      </div>
    ))}
  </div>
);

export default QuestionSelection;