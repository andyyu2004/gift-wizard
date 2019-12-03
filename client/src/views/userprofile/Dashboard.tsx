import { RouteComponentProps, navigate } from '@reach/router';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SavedTemplates } from '../';
import { QRepo } from '../../components/questions';
import { Sidebar, AdminSettings } from '../../components';
import adminicon from '../../images/user_profile_placeholder.png';
import { AppState } from '../../reducers';
import { Questionnaire, UserType } from 'shared/types';
import "./Dashboard.css";
import UserManagement from './UserManagement';
import { withProtection } from '../../components/hoc';

type PropType = RouteComponentProps;

/** Enumeration of the subviews of the page */ 
enum Subview {
  UserManagement   = "User Management",
  QuestionnaireLib = "Questionnaires",
  // UserData         = "User Data",
  // AccountHistory   = "Account History",
  AdminSettings    = "Settings",
}

const Dashboard: React.FC<PropType> = props => {
  const userType = useSelector<AppState, UserType>(state => state.user.user!.type);

  const viewMap = {
    [Subview.UserManagement]: <UserManagement />,
    [Subview.QuestionnaireLib]: <QuestionnaireLib />,
    // [Subview.UserData]: <h6>User Data</h6>,
    // [Subview.AccountHistory]: <h6>Account history</h6>,
    [Subview.AdminSettings]: <AdminSettings />,
  };

  const [view, setView] = useState(Subview.QuestionnaireLib);
  const entries: [string, () => void][] = Object.values(Subview).map(subview => [subview, () => setView(subview)]);

  useEffect(() => {
    if (userType === UserType.Regular) navigate('/'); 
    else if (userType === UserType.None) navigate('login');
  }, [userType]);

  return (
    <div className="flex-container">
      <Sidebar 
        img={adminicon}
        text="admin"
        entries={entries} />
      {viewMap[view]}
    </div>
  );
};

function QuestionnaireLib() {
  /** Fetch site wide templates */
  const templates = useSelector<AppState, { [key: string]: Questionnaire }>(state => state.forms.templates)
  return (
    <div className= "adminview">
      <QRepo />
      <SavedTemplates title="Questionnaire Repository" templates={[]} />
    </div>
  );
}

export default withProtection(Dashboard);
