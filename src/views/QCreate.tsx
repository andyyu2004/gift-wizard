/**
 * Questionnaire creation page
 */
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { ThemeSelection } from '../components';
import { QEditContainer } from '../containers';
import { FormRepr } from '../components/QEdit';
import './QCreate.css';

type PropType = RouteComponentProps & {
  starterForm?: FormRepr[],
};

const QCreate: React.FC<PropType> = ({ starterForm }) => (
  <div className="questionnaire">
    <h3 className="header">Customize your questionnaire</h3>
    <div className="themeContainer"><ThemeSelection /></div>
    <QEditContainer starterForm={starterForm} />
  </div>
);

export default QCreate;