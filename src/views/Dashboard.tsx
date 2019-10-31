import { navigate, RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from '../components';
import adminicon from '../images/user_profile_placeholder.png';
import { AppState } from '../reducers';
import { UserType } from '../types';
import UserManagement from './UserManagement';

type PropType = RouteComponentProps;

/** Enumeration of the subviews of the page */ 
enum Subview {
  UserManagement   = "User Management",
  QuestionnaireLib = "Areas of Interest",
  UserData         = "User Data",
  AccountHistory   = "Account History",
  AdminSettings    = "Settings",
}


const Dashboard: React.FC<PropType> = props => {
  const userType = useSelector<AppState, UserType>(state => state.user.userType);

  const viewMap = {
    [Subview.UserManagement]: <UserManagement />,
    [Subview.QuestionnaireLib]: <h6>Questionnaire Repository</h6>,
    [Subview.UserData]: <h6>User Data</h6>,
    [Subview.AccountHistory]: <h6>Account history</h6>,
    [Subview.AdminSettings]: <h6>Admin Settings</h6>,
  };

  const [view, setView] = useState(Subview.UserManagement);
  const entries: [string, () => void][] = Object.values(Subview).map(subview => [subview, () => setView(subview)]);

  /** Temporarily comment below to not kick out unauthorized users during dev */

  // useEffect(() => {
  //   // Just navigate to home if not authorized
  //   console.log("User Type", userType);
  //   if (userType === UserType.Regular) navigate('/'); 
  //   else if (userType === UserType.None) navigate('login');
  // }, [userType]);

  return (
    <div className="flex-container">
      <Sidebar 
        img={adminicon}
        text="admin"
        entries={entries} />
      {viewMap[view]}
    </div>
  );
}

export default Dashboard;
