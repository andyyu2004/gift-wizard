import { navigate, RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from '../components';
import adminicon from '../images/user_profile_placeholder.png';
import { AppState } from '../reducers';
import { UserType } from '../types';

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
    [Subview.UserManagement]: null,
    [Subview.QuestionnaireLib]: null,
    [Subview.UserData]: null,
    [Subview.AccountHistory]: null,
    [Subview.AdminSettings]: null,  
  };

  const [view, setView] = useState(Subview.UserManagement);
  const entries: [string, () => void][] = Object.values(Subview).map(subview => [subview, () => setView(subview)]);

  useEffect(() => {
    // Just navigate to home if not authorized
    console.log("User Type", userType);
    if (userType === UserType.Regular) navigate('/'); 
    else if (userType === UserType.None) navigate('login');
  }, [userType]);

  return (
    <div>
      <Sidebar 
        img={adminicon}
        text="admin"
        entries={entries} />
      {viewMap[view]}
    </div>
  );
}

export default Dashboard;
