import React from 'react';
import uuid from 'uuid/v4';
import { addForm } from '../actions/actionCreaters';
import { FormAction } from "../types/FormTypes";
import { FormRepr, QuestionType } from './QEdit';
import './QuestionSelection.css';

type PropType = {
  questionData: [QuestionType, string, (id: string) => FormRepr][],
  dispatch: React.Dispatch<FormAction>,
};

const QuestionSelection: React.FC<PropType> = ({ questionData, dispatch }) => (
  <div className="questions">
    {questionData.map(([qtype, img, form]) => (id =>
      <div className="question" key={id} onClick={() => dispatch(addForm(form(id)))}>
        <img src={img} className="qimg" /*style={{width:"20px"}}*/ alt="question icon"/>
        <span className="qText">{qtype}</span>
      </div>)(uuid()) // IIFE with an id to apply to the form
    )}
  </div>
);

export default QuestionSelection;