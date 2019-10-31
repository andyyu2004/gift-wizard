/**
 * Questionnaire creation page
 */
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { ThemeSelection } from '../components';
import { QEditContainer } from '../containers';
import { FormRepr } from '../components/QEdit';

type PropType = RouteComponentProps & {
  starterForm?: FormRepr[],
};

const QCreate: React.FC<PropType> = ({ starterForm }) => (
  <div>
    <h3>Questionnaire Creation View</h3>
    {/* <ThemeSelection /> */}
    <QEditContainer starterForm={starterForm} />
  </div>
);

export default QCreate;