import { Router } from '@reach/router';
import * as React from 'react';
import './App.css';
import { Header } from './components';
import { Dashboard, ErrorsView, Home, LoginView, PeopleView, ProfileView, QCreate, SavedTemplates } from './views';

/**
 * Putting Header in the top level as the header should be the same throughout all views?
 * @param props 
 */

const App: React.SFC = props => {
  const mainTitle = "GiftWizards";
  const mainSubtitle = "Struggling to find a gift for your loved ones? Congrats! You have found the place for that!";
  return (
    <div className="App">
      <Header 
        title={mainTitle}
        subtitle={mainSubtitle} />
      <Router>
        <Home path="/" />
        <Dashboard path="admin" />
        <QCreate path="create" />
        <LoginView path="login" />
        <ProfileView path="profile/*" />
        <PeopleView path="people/:userid" />
        {/* Getting saved user forms from redux store for now */}
        <SavedTemplates path="open" />
        <ErrorsView path="*" errorCode={404}/>
      </Router>
    </div>
  );
};

export default App;
