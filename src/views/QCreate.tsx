/**
 * Questionnaire creation page
 */
import React from 'react'
import { RouteComponentProps } from '@reach/router';
import { ThemeSelection, QuestionSelection, QEdit } from '../components';
import { QEditContainer } from '../containers';

const QCreate: React.FC<RouteComponentProps> = props => (
  <div>
    <h3>Questionnaire Creation View</h3>
    <ThemeSelection />
    <QEditContainer />
  </div>
);

export default QCreate;