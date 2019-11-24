import { Redirect } from '@reach/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { User } from 'shared/types';
import { AppState } from '../../reducers';

const withProtection = (Component: React.FC) => (props: any) => {
  const loggedIn = useSelector<AppState, User | undefined>(state => state.user.user);
  return loggedIn ? <Component {...props} /> : <Redirect to="/login" noThrow />;
};

export default withProtection;