import React, { useState, useEffect, useCallback } from 'react'
import { RouteComponentProps } from '@reach/router';
import { Tabs, Tab } from 'react-bootstrap';
import { QMail, Questionnaire } from 'shared/types';
import { navigateWithDefaultLoadedQuestionnaire } from '../actions/navigation';
import API from '../api';
import { toast } from 'react-toastify';

const Mail: React.FC<RouteComponentProps> = () => {
  const [received, setReceived] = useState<QMail[]>([]);
  const [sent, setSent] = useState<QMail[]>([]);
  const [currentQ, setCurrentQ] = useState<Questionnaire>();
  const toggleForm = (q: Questionnaire) => currentQ !== q || currentQ === undefined ? setCurrentQ(q) : setCurrentQ(undefined);

  const loadReceived = useCallback(async () => (await API.loadReceived())
    .map(mail => {
      console.log("rmail", mail);
      setReceived(mail)
    })
    .mapLeft(toast.error), []);
  
  useEffect(() => {
    loadReceived();
  }, [loadReceived]);

  const MailList: React.FC<{ mail: QMail[] }> = ({ mail }) => (
    <div className="templateContainer">
      {mail.map(t => 
        <div key={t.questionnaire._id}>
          <button
            style={{marginTop:"5px", marginBottom: "5px", border: "solid 2px #C4E1FF", backgroundColor:"#FFFFFF"}}
            className="generic-button"
            onClick={() => toggleForm(t.questionnaire)}
          >{t.questionnaire.label}
          </button>
          <button 
            style={{marginTop:"5px", marginBottom: "5px", backgroundColor:"#FFF"}}
            className="generic-button"
            onClick={() => navigateWithDefaultLoadedQuestionnaire(t.questionnaire)}
            >Edit
          </button>
        </div>
        )
      }
    </div>
  );

  return (
    <div className="flex-container">
      <h6>Fucking kill me</h6>
      <Tabs id="main-tab-container">
        <Tab title="Recieved">
          <h6>Hello??</h6>
          <h6>Hello??</h6>
          <h6>Hello??</h6>
          {/* <MailList mail={received} /> */}
        </Tab>
        <Tab title="Sent">
          <MailList mail={sent} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Mail;