/**
 * Questionnaire creation page
 */
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { ThemeSelection } from '../components';
import { QEditContainer } from '../containers';
import { FormRepr } from '../components/QEdit';

type RouteProps = {
  starterForm?: FormRepr[]
};

type PropType = RouteComponentProps<RouteProps>;

const QCreate: React.FC<PropType> = props => {
  const { formLabel, starterForm }: { formLabel: string, starterForm: FormRepr[] } = props.location.state;
  return (
    <div>
      <h3>Questionnaire Creation View</h3>
      <ThemeSelection />
      <QEditContainer defaultFormLabel={formLabel} starterForm={starterForm} />
    </div>
  );
};

export default QCreate;