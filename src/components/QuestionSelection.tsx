import React from 'react';
import './QuestionSelection.css';

const QuestionSelection = ({ questions, addQuestion }) => (
  <div className="questions">
    {questions.map(([qtype, img, component]) => (
      <div className="question" key={qtype} onClick={() => addQuestion(component)}>
        <img src={img} style={{width:"20px"}} />
        <span className="qText">    {qtype}</span>
      </div>
    ))}
  </div>
);

export default QuestionSelection;