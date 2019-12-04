import { RouteComponentProps, navigate } from '@reach/router';
import React, { useState } from 'react';
import QEdit from '../components/questions/QEdit';
import { Questionnaire } from 'shared/types';
import "./SavedTemplates.css";
import { navigateWithDefaultLoadedQuestionnaire } from '../actions/navigation';
import { withProtection } from '../components/hoc';

type PropType = RouteComponentProps & {
  title?: string,
  templates?: Questionnaire[],
};

const SavedTemplates: React.FC<PropType> = props => {
  const [currentQ, setCurrentQ] = useState<Questionnaire>();
  /** If templates are passed directly use that, else use the ones passed from router */
  const templates: Questionnaire[] = props.templates || (props.location && props.location.state.templates) || [];
  const title = props.title || (props.location && props.location.state.title);

  /** If currently selected questionnaire is not q, or q is currently undefined, then set currentQ to q, else toggle back to undefined*/
  const toggleForm = (q: Questionnaire) => currentQ !== q || currentQ === undefined ? setCurrentQ(q) : setCurrentQ(undefined) ;

  return (
    <div className="page">
      <h3 className="header">{title}</h3>
      <div className="templateContainer">
        {templates.map(t => 
          <div key={t._id}>
            <button
              style={{marginTop:"5px", marginBottom: "5px", border: "solid 2px #C4E1FF", backgroundColor:"#FFFFFF"}}
              className="generic-button"
              onClick={() => toggleForm(t)}
            >{t.label}
            </button>
            <button 
              style={{marginTop:"5px", marginBottom: "5px", backgroundColor:"#FFF"}}
              className="generic-button"
              onClick={() => navigateWithDefaultLoadedQuestionnaire(t)}
              >Edit
            </button>
          </div>
          )
        }
      </div>
      <div className="step">
        {currentQ && 
          <div>
            <h6 className="qtitle">{currentQ.label}</h6>
            <QEdit questionnaire={currentQ} editable={false} />
          </div>
        }
      </div>
    </div>
  );
};

export default withProtection(SavedTemplates);