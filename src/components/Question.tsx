import React from 'react';
import { setQuestion } from '../actions/actionCreaters';
import { FormAction } from '../containers/QEditContainer';
import { FormRepr } from './QEdit';

type PropType = {
  formRepr: FormRepr,
  dispatch: React.Dispatch<FormAction>,
  editable: boolean,
};

const Question: React.FC<PropType> = ({ editable, formRepr, dispatch }) => (
  <>
    {editable  
      ? <><input type="text" onChange={e => dispatch(setQuestion(e.target.value, formRepr.id))} value={formRepr.question} /> <br /></>
      : <h6>{formRepr.question}</h6>}
  </>
);

export default Question;