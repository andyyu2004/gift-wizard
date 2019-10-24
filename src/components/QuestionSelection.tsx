import React from 'react';


const QuestionSelection = ({ questions }) => (
  <div className="v-flex-container">
    {questions.map(([qtype, img]) => (
      <div>
        <img src={img} style={{width:"20px"}} />
        {qtype}
      </div>
    ))}
  </div>
);

export default QuestionSelection;