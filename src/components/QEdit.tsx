import React from 'react';
import './QEdit.css'

/** Questionnaire edit component */
const QEdit = ({ children }) => {
  return (
    <div className= "edit" >
      Questionnaire Edit
      {children}
    </div>
  );
};

export default QEdit;