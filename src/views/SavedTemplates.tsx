import { RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import QEdit from '../components/QEdit';
import { Questionnaire } from '../types/FormTypes';

type PropType = RouteComponentProps & {
  templates: { [key: string]: Questionnaire },
};

const SavedTemplates: React.FC<PropType> = ({ templates }) => {
  const [currentQ, setCurrentQ] = useState(null);

  const toggleForm = (key: string) => currentQ !== key || currentQ === null ? setCurrentQ(key) : setCurrentQ(null) ;

  return (
    <div>
      <h6>Saved Templates (Click to peek)</h6>
      {Object.keys(templates).map(key => 
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
          <QEdit questionnaire={templates[currentQ]} editable={false} />
        </div>
      }
    </div>
  );
};

export default SavedTemplates