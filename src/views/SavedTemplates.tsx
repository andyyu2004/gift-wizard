import { RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import QEdit from '../components/QEdit';
import { Questionnaire } from '../types/FormTypes';
import "./SavedTemplates.css";

type PropType = RouteComponentProps & {
  templates?: { [key: string]: Questionnaire },
};

const SavedTemplates: React.FC<PropType> = props => {
  const [currentQ, setCurrentQ] = useState(null);
  console.log(props)
  /** If templates are passed directly use that, else use the ones passed from router */
  const templates = props.templates || props.location.state.templates;
  
  const toggleForm = (key: string) => currentQ !== key || currentQ === null ? setCurrentQ(key) : setCurrentQ(null) ;

  return (
    <div className="page">
      <h3 className="header">Saved Templates</h3>
      <div className="templateContainer">
        {Object.keys(templates).map(key => 
          <div key={key}>
            <button 
              style={{marginTop:"5px", marginBottom: "5px", border: "solid 2px #C4E1FF"}}
              className="generic-button"
              onClick={() => toggleForm(key)}
              >{key}
            </button>
          </div>
          )
        }
      </div>
      <div className="step">
        {currentQ && 
          <div>
            <h6 className="qtitle">{currentQ}</h6>
            <QEdit questionnaire={templates[currentQ]} editable={false} />
          </div>
        }
      </div>
    </div>
  );
};

export default SavedTemplates