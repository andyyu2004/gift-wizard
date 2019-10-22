import * as React from 'react';
import { Home, Dashboard, QCreate, ErrorsView, LoginView } from './views';
import { Router, Link } from '@reach/router';
import { Provider, connect } from 'react-redux';

import './App.css';
import { Header } from './components';
import { AppState } from './reducers';
import { UserType } from './types';

type PropType = StateProps;

/**
 * Putting Header in the top level as the header should be the same throughout all views?
 * @param props 
 */
const App: React.SFC<PropType> = props => {
  const { userType } = props;
  const mainTitle = "Gift Wizard (plz style everything! :))";
  const mainSubtitle = "Struggling to find a gift for your loved ones? Congrats! You have found the place for that!";
  return (
    <>
      <Header 
        title={mainTitle}
        subtitle={mainSubtitle}
        isLoggedIn={userType !== UserType.None} />
      <Router>
        <Home path="/" />
        <Dashboard path="admin" />
        <QCreate path="create" />
        <LoginView path="login" />
        <Dashboard path="/admin" />
        <ErrorsView path="*" errorCode={404}/>
      </Router>
    </>
  );
}

type StateProps = { 
  userType: UserType;
}

const mapStateToProps = (state: AppState) => {
  const { userType } = state;
  return { userType };
};

export default connect(mapStateToProps, null)(App);
