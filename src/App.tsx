import * as React from 'react';
import { Home, Dashboard, QCreate, ErrorsView, LoginView } from './views';
import { Router, Link } from '@reach/router';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';

const App: React.SFC = () => (
  <Provider store={store}>
    <Router>
      <Home path="/" />
      <Dashboard path="admin" />
      <QCreate path="create" />
      <LoginView path="login" />
      <Dashboard path="/admin" />
      <ErrorsView path="*" errorCode={404}/>
    </Router>
  </Provider>
)

export default App;
