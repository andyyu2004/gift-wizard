import { Router } from '@reach/router';
import * as React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { Header } from './components';
import { AppState } from './reducers';
import { UserType } from './types';
import { Dashboard, ErrorsView, Home, LoginView, QCreate, ProfileView, PeopleView, SavedTemplates } from './views';

/**
 * Putting Header in the top level as the header should be the same throughout all views?
 * @param props 
 */

const App: React.SFC = props => {
  const mainTitle = "GiftWizards";
  const mainSubtitle = "Struggling to find a gift for your loved ones? Congrats! You have found the place for that!";
  const userType = useSelector((state: AppState) => state.user.userType);
  return (
    <div className="App">
      <Header 
        title={mainTitle}
        subtitle={mainSubtitle}
        isLoggedIn={userType !== UserType.None} />
      <Router>
        <Home path="/" />
        <Dashboard path="admin" />
        <QCreate path="create" />
        <LoginView path="login" />
        <ProfileView path="profile" />
        <PeopleView path="people/:userid" />
        <SavedTemplates path="open" />
        <ErrorsView path="*" errorCode={404}/>
      </Router>
    </div>
  );
}

export default App;
