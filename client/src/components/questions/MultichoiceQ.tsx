import React from 'react';
import { setCheckboxStatus, updateOption, addOption, removeOption } from '../../actions/actionCreaters';
import { MultichoiceRepr } from 'shared/types';
import Question from './Question';
// import cancel_icon from '../images/cancel_icon.png';
import { FormAction } from "../../types/FormActions";
import "./MultichoiceQ.css";

type PropType = {
  formRepr: MultichoiceRepr,
  dispatch?: React.Dispatch<FormAction>,
  editable: boolean,
};

/**
 * Key uniqueness in the checkboxes is very important. React gets confused and screws up clickbox very badly otherwise
 * Do not use choice as key, as it gets mutated
 * @param param0 
 */
const MultichoiceQ: React.FC<PropType> = ({ formRepr, dispatch, editable }) => {
  const { options } = formRepr;

  /** If dispatch is not passed, completely freeze everything to be disabled (not just readonly) */
  const frozen = dispatch === undefined;

  const handleAddOption = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch && dispatch(addOption("New Option", formRepr.id));
  };

  const handleDeleteOption = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    dispatch && dispatch(removeOption(index, formRepr.id));
  };

  return (
    <div>
      <Question formRepr={formRepr} dispatch={dispatch} editable={editable} />
      {editable && <button className='generic-button' onClick={handleAddOption}>Add Option</button>}
      <br />
      {options.map(([choice, isChecked, id], i) => (
        <div key={id}>
          <input className="checkbox" disabled={frozen} type="checkbox" id={id} checked={isChecked} onChange={e => dispatch && dispatch(setCheckboxStatus(i, e.target.checked, formRepr.id))} /> 
          {editable 
            ? <input className="optionbox" type="text" value={choice} onChange={e => dispatch && dispatch(updateOption(e.target.value, i, formRepr.id))}/>
            : <label className="options" htmlFor={id}>{choice}</label>}
        {editable && <button onClick={e => handleDeleteOption(e, i)} className="generic-button">del</button>} {/* Replace this with an image or something when you style it */}
        </div>
      ))} 
    </div>
  );
};

export default MultichoiceQ;