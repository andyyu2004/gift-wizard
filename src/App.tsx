import * as React from 'react';
import { Home, Dashboard, QCreate, ErrorsView } from './views';
import { Router, Link } from '@reach/router';
import './App.css';

const App: React.SFC = () => (
  <Router>
    <Home path="/" />
    <Dashboard path="admin" />
    <QCreate path="create" />
    <ErrorsView path="*" errorCode={404}/>
  </Router>
)

export default App;
