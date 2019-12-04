import { RouteComponentProps } from '@reach/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { QMail, Questionnaire } from 'shared/types';
import { navigateWithDefaultLoadedQuestionnaire, answerQuestionnaire } from '../actions/navigation';
import API from '../api';
import { Sidebar } from '../components';
import { QEdit } from '../components/questions';
import mailicon from '../images/mail_icon.png';
import './Mail.css';

const Mail: React.FC<RouteComponentProps> = () => {
  const [received, setReceived] = useState<QMail[]>([]);
  const [sent, setSent] = useState<QMail[]>([]);

  // Alternator between sent and received
  const [mailbox, setMailbox] = useState<string>("Received");
  const mail = mailbox == "Sent" ? sent : received;
  
  const [currentQ, setCurrentQ] = useState<Questionnaire>();
  const toggleForm = (q: Questionnaire) => currentQ !== q || currentQ === undefined ? setCurrentQ(q) : setCurrentQ(undefined);

  const loadReceived = useCallback(async () => (await API.loadReceived())
    .map(setReceived)
    .mapLeft(toast.error), []);
  
  const loadSent = useCallback(async () => (await API.loadSentMail())
    .map(setSent)
    .mapLeft(toast.error), []);
  
  useEffect(() => {
    loadReceived();
    loadSent();
  }, [loadReceived, loadSent]);

  const handleClick = (q: Questionnaire) => {
    navigateWithDefaultLoadedQuestionnaire(q);
    // if (mailbox == "Sent") navigateWithDefaultLoadedQuestionnaire(q);
    // else if (mailbox == "Received") answerQuestionnaire(q);
  };

  return (
    <div className="flex-container">
      <Sidebar entries={[["Received", () => setMailbox("Received")], ["Sent", () => setMailbox("Sent")]]} />
      <div className="templateContainerMail">
        <h6>{mailbox}</h6>
        {mail.map(t => 
          <div key={t.questionnaire._id}>
            <button
              style={{marginTop:"5px", marginBottom: "5px", marginRight:"10px", border: "solid 2px #C4E1FF", backgroundColor:"#FFFFFF"}}
              className="generic-button"
              onClick={() => toggleForm(t.questionnaire)}
            >{t.questionnaire.label}
            </button>
            <button 
              style={{marginTop:"5px", marginBottom: "5px", backgroundColor:"#FFF"}}
              className="generic-button"
              onClick={() => handleClick(t.questionnaire)}
              >{mailbox == "Received" ? "Answer" : "Edit"}
            </button>
          </div>
          )
        }
      </div>

      <div className="stepMail">
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

export default Mail;





















