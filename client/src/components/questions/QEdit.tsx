import React, { MouseEvent } from 'react';
import { RankQ, RateQ, ShortAnswerQ } from '.';
import { FormAction } from "../../types/FormActions";
import { Questionnaire, FormRepr } from 'shared/types';
import MultichoiceQ from './MultichoiceQ';
import './QEdit.css';
import { removeForm } from '../../actions/actionCreaters';

type PropType = {
  questionnaire: Questionnaire,  
  dispatch?: React.Dispatch<FormAction>,
  editable: boolean,
};

/** Questionnaire edit component 
 *  Probably need to pass a mode flag or something to this component and all the subcomponents indicating whether to allow editing or not
*/
const QEdit: React.FC<PropType> = ({ questionnaire, dispatch, editable }) => {
  /** Safe guard when the questionnaire is deleted while it is open */
  if (!questionnaire) return null;
  const { forms, background } = questionnaire;

  const renderForm = (repr: FormRepr) => {
    switch (repr.kind) {
      case "MCR":  return <MultichoiceQ dispatch={dispatch} key={repr.id} formRepr={repr} editable={editable} />
      case "SAR":  return <ShortAnswerQ dispatch={dispatch} key={repr.id} formRepr={repr} editable={editable} />
      case "RTR":  return <RateQ key={repr.id} dispatch={dispatch} formRepr={repr} editable={editable} />
      case "RNKR": return <RankQ key={repr.id} dispatch={dispatch} formRepr={repr} editable={editable} />
    }
  };
  
  const handleRemoveForm = (e: MouseEvent<HTMLElement>, formId: string) => {
    e.preventDefault();
    dispatch && dispatch(removeForm(formId))
  };

  return (
    <div className= "edit" style={{ backgroundImage: `url(${background})`, backgroundRepeat: "repeat",  backgroundSize: "250px" }}>
      <form>
        {forms.map(form => (
          <div key={form.id} className="q">
            {renderForm(form)}
            {editable && <button className="generic-button" onClick={e => handleRemoveForm(e, form.id)}>Remove question</button>}
          </div>))
        }
      </form>
    </div>
  );
}

export default QEdit;


