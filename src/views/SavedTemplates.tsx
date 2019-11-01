import { RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import QEdit from '../components/QEdit';
import { AppState } from '../reducers';
import { Questionnaire } from '../types/FormTypes';

const SavedTemplates: React.FC<RouteComponentProps> = () => {
  const questionnaires = useSelector<AppState, { [key: string]: Questionnaire }>(state => state.forms);
  const [currentQ, setCurrentQ] = useState(null);

  const toggleForm = (key: string) => currentQ !== key || currentQ === null ? setCurrentQ(key) : setCurrentQ(null) ;

  return (
    <div>
      <h6>Saved Templates (Click to peek)</h6>
      {Object.keys(questionnaires).map(key => 
        <div key={key}>
          <button 
            className="generic-button"
            onClick={() => toggleForm(key)}
            >{key}
          </button>
        </div>
        )
      }
      {currentQ && 
        <div>
          <h6>{currentQ}</h6>
          <QEdit questionnaire={questionnaires[currentQ]} editable={false} />
        </div>
      }
    </div>
  );
};

export default SavedTemplates