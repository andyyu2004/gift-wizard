import React, { useEffect } from 'react'
import { RouteComponentProps, navigate } from '@reach/router';
import { AppState } from '../reducers';
import { UserType } from '../types';
import { useSelector } from 'react-redux';

type PropType = RouteComponentProps;

const Dashboard: React.FC<PropType> = props => {
  const userType = useSelector<AppState, UserType>(state => state.user.userType);
  
  useEffect(() => {
    // Just navigate to home if not authorized
    console.log("User Type", userType);
    if (userType === UserType.Regular) navigate('/'); 
    else if (userType === UserType.None) navigate('login');
  }, [userType]);

  return (
    <div>
      Administrative Dashboard
    </div>
  );
}

export default Dashboard;
