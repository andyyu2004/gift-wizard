import React, { useEffect } from 'react'
import { RouteComponentProps, navigate } from '@reach/router';
import { AppState } from '../reducers';
import { UserType } from '../types';
import { connect } from 'react-redux';

type PropType = RouteComponentProps & StateProps;

const Dashboard: React.FC<PropType> = props => {
  const { userType } = props;
  
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

type StateProps = { userType: UserType };

const mapStateToProps = (state: AppState) => {
  const { userType } = state;
  return { userType };
};

export default connect(mapStateToProps, null)(Dashboard);
