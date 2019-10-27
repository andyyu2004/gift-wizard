import React from 'react';
import { setCheckboxStatus, updateOption } from '../actions/actionCreaters';
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
      {options.map(([choice, isChecked, id], i) => (
        <div key={id}>
          <input type="checkbox" id={id} checked={isChecked} onChange={e => dispatch(setCheckboxStatus(choice, e.target.checked, formRepr.id))} /> 
          {editable 
            ? <input type="text" value={choice} onChange={e => dispatch(updateOption(e.target.value, i, formRepr.id))}/>
            : <label htmlFor={id}>{choice}</label>}
        </div>
      ))} 
    </>
  );
};

export default MultichoiceQ;