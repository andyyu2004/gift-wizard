import React from 'react';
import { setCheckboxStatus, updateCheckboxOption } from '../actions/actionCreaters';
import { FormAction } from '../containers/QEditContainer';
import { MultichoiceRepr } from './QEdit';
import Question from './Question';

type PropType = {
  formRepr: MultichoiceRepr,
  dispatch: React.Dispatch<FormAction>,
  editable: boolean,
};

/**
 * Key uniqueness in the checkboxes is very important. React gets confused and screws up clickbox very badly otherwise
 * Do not use choice as key, as it gets mutated
 * @param param0 
 */
const MultichoiceQ: React.FC<PropType> = ({ formRepr, dispatch, editable }) => {
  const { options, question } = formRepr;
  return (
    <>
      <Question formRepr={formRepr} dispatch={dispatch} editable={editable} />
      {options.map(([choice, isChecked], i) => (
        <div key={`${formRepr.id}${i}`}>
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