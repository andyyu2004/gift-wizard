import React from 'react';


const QuestionSelection = ({ questions, addQuestion }) => (
  <div className="v-flex-container">
    {questions.map(([qtype, img, component]) => (
      <div key={qtype} onClick={() => addQuestion(component)}>
        <img src={img} style={{width:"20px"}} />
        {qtype}
      </div>
    ))}
  </div>
);

export default QuestionSelection;