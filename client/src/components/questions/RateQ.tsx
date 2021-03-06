import React from 'react';
import StarRating from 'react-star-ratings';
import { FormAction } from "../../types/FormActions";
import { RateFormRepr } from 'shared/types';
import Question from './Question';
import { updateRating } from '../../actions/actionCreaters';

type PropType = {
  formRepr: RateFormRepr,
  dispatch?: React.Dispatch<FormAction>,
  editable: boolean,
};

const RateQ: React.FC<PropType> = ({ formRepr, dispatch, editable }) => {
  const { rating } = formRepr;
  return (
    <div>
      <Question formRepr={formRepr} dispatch={dispatch} editable={editable} />
      <StarRating 
        starDimension="30px"
        numberOfStars={10} 
        rating={rating}
        starRatedColor="#66B3FF"
        starHoverColor="#C4E1FF"
        // You can style the StarRating in here: refer to https://www.npmjs.com/package/react-star-ratings
        changeRating={(r: number) => dispatch && dispatch(updateRating(r, formRepr.id))} />
    </div>
  );
};

export default RateQ;