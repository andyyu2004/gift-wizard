import { Router } from '@reach/router';
import * as React from 'react';
import './App.css';
import { Header } from './components';
import { ErrorsView, Home, LoginView, QCreate, SavedTemplates, Signup, Mail } from './views';
import { Dashboard, PeopleView, ProfileView, BrowsePeople } from './views/userprofile';

/**
 * Putting Header in the top level as the header should be the same throughout all views?
 * @param props 
 */

const App: React.SFC = () => {
  const mainTitle = "GiftWizards";
  const mainSubtitle = "Struggling to find a gift for your loved ones? Congrats! You have found the place for that!";

  
  return (
    <div className="App">
      <Header 
        title={mainTitle}
        subtitle={mainSubtitle} />
      <Router className="main-container">
        <Home path="/" />
        <Dashboard path="admin" />
        <QCreate path="create" />
        <LoginView path="login" />
        <ProfileView path="profile/*" />
        <PeopleView path="people/:userid" />
        <BrowsePeople path="people" />
        <SavedTemplates path="open" />
        <Mail path="mail" />
        <Signup path="signup" />
        <ErrorsView path="*" errorCode={404}/>
      </Router>
    </div>
  );
};

export default App;
