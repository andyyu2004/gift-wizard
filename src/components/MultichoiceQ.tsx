import React from 'react'
import { MultichoiceRepr } from './QEdit';
import { FormAction } from '../containers/QEditContainer';

type PropType = {
  formRepr: MultichoiceRepr,
  dispatch: React.Dispatch<FormAction>,
};

const MultichoiceQ: React.FC<PropType> = ({ formRepr }) => {
  const { options, question } = formRepr;
  return (
    <>
      <h6>{question}</h6>
      <input type="checkbox"/>
    </>
  );
};

export default MultichoiceQ;