import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router';
import { useSelector } from 'react-redux';
import { AppState } from '../reducers';
import QEdit, { FormRepr } from '../components/QEdit';

const SavedTemplates: React.FC<RouteComponentProps> = () => {
  const forms = useSelector<AppState, { [key: string]: FormRepr[] }>(state => state.forms);
  const [currentForm, setCurrentForm] = useState(null);

  const toggleForm = (key: string) => currentForm !== key || currentForm === null ? setCurrentForm(key) : setCurrentForm(null) ;

  return (
    <div>
      <h6>Saved Templates (Click to peek)</h6>
      {Object.keys(forms).map(key => 
        <div key={key}>
          <button 
            className="generic-button"
            onClick={() => toggleForm(key)}
            >{key}
          </button>
        </div>
        )
      }
      {currentForm && 
        <div>
          <h6>{currentForm}</h6>
          <QEdit forms={forms[currentForm]} editable={false} />
        </div>
      }
    </div>
  );
};

export default SavedTemplates