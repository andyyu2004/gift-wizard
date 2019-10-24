import React from 'react';
import './QuestionSelection.css';

const QuestionSelection = ({ questions, addQuestion }) => (
<<<<<<< HEAD
  <div className="v-flex-container">
    {questions.map(([qtype, img, createComponent]) => (
      <div key={qtype} onClick={() => addQuestion(createComponent())}>
=======
  <div className="questions">
    {questions.map(([qtype, img, component]) => (
      <div className="question" key={qtype} onClick={() => addQuestion(component)}>
>>>>>>> 92defc1aed59886e328db0d8ea96c04ce23e3947
        <img src={img} style={{width:"20px"}} />
        <span className="qText">    {qtype}</span>
      </div>
    ))}
  </div>
);

export default QuestionSelection;