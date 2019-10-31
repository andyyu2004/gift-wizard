/**
 * Questionnaire creation page
 */
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { ThemeSelection } from '../components';
import { QEditContainer } from '../containers';

const QCreate: React.FC<RouteComponentProps> = () => (
  <div>
    <h3>Questionnaire Creation View</h3>
    {/* <ThemeSelection /> */}
    <QEditContainer />
  </div>
);

export default QCreate;