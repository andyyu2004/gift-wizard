import React from 'react'
import { MultichoiceRepr } from './QEdit';
import { FormAction } from '../containers/QEditContainer';
import { setCheckboxStatus, updateCheckboxOption } from '../actions/actionCreaters';
import uuid from 'uuid/v1';

type PropType = {
  formRepr: MultichoiceRepr,
  dispatch: React.Dispatch<FormAction>,
  editable: boolean,
};

/**
 * Key uniqueness in the checkboxes is very important. React gets confused and screws up clickbox very badly otherwise
 * @param param0 
 */
const MultichoiceQ: React.FC<PropType> = ({ formRepr, dispatch, editable }) => {
  const { options, question } = formRepr;
  return (
    <>
      <h6>{question}</h6>
      {options.map(([choice, isChecked], i) => (
        <div key={i}>
          <input type="checkbox" id={choice} checked={isChecked} onChange={e => dispatch(setCheckboxStatus(choice, e.target.checked, formRepr))} /> 
          {editable 
            ? <input type="text" value={choice} onChange={e => dispatch(updateCheckboxOption(e.target.value, i, formRepr))}/>
            : <label htmlFor={choice}>{choice}</label>}
        </div>
      ))} 
    </>
  );
};

export default MultichoiceQ;