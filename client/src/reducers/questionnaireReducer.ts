/**
 * Reducer logic for editing questionnaires
 */

import { FormRepr, ShortAnswerRepr, MultichoiceRepr, RateFormRepr, RankFormRepr } from 'shared/types';
import uuid from 'uuid/v4';
import { FormAction } from '../types/FormActions';


export type TFormReducer = (state: FormRepr[], action: FormAction) => FormRepr[];

/** Assume the user sends non-retarded actions (i.e. uses an action from a suitable type of FormRepr) */
export const formReducer: TFormReducer = (state, action) => {
  const i = state.findIndex(repr => repr.id === action.formId);
  const repr: FormRepr = state[i];
  switch (action.type) {

    case "SET_SHORT_ANSWER": {
      const { answer } = action;
      const newRepr = {
        ...repr as ShortAnswerRepr,
        answer,
      };
      return Object.assign([...state], { [i]: newRepr });
    }

    case "SET_QUESTION": {
      const { question } = action;
      const newRepr: FormRepr = {
        ...repr as FormRepr,
        question,
      };
      return Object.assign([...state], { [i]: newRepr });
    }

    case "ADD_FORM": return [...state, action.form];

    case "REMOVE_FORM": {
      const newState = [...state];
      newState.splice(i, 1);
      return newState;
    }

    case "UPDATE_RATING": {
      const { rating } = action;
      const newRepr = {
        ...repr as RateFormRepr,
        rating,
      };
      return Object.assign([...state], { [i]: newRepr });
    }

    /** Do it by index because there might be duplicate options */
    case "SET_CHECK_BOX_STATUS": {
      const { index, status } = action;
      const newRepr: MultichoiceRepr = { ...repr as MultichoiceRepr };
      // Set all to false first if mutex
      if (newRepr.mutex) newRepr.options = newRepr.options.map(([q, _, id]) => [q, false, id]);
      newRepr.options[index][1] = status; // Tuples are mutable in ts
      return Object.assign([...state], { [i]: newRepr });
    }

    case "UPDATE_OPTION": {
      const { index, newOption } = action;
      if (repr.kind === "MCR" || repr.kind === "RNKR") 
        repr.options[index][0] = newOption;
      return Object.assign([...state], { [i]: repr });
    }

    case "REORDER_RANK": {
      const { sourceIndex, destIndex } = action;      
      const newRepr = { ...repr as RankFormRepr };
      const tmp = newRepr.options.splice(sourceIndex, 1);
      newRepr.options.splice(destIndex, 0, tmp[0]);
      return Object.assign([...state], { [i]: newRepr })
    } 

    case "ADD_OPTION": {
      const { elem } = action;
      if (repr.kind === "MCR")
        repr.options = [...repr.options, [elem, false, uuid()]];
      else if (repr.kind === "RNKR")
        repr.options = [...repr.options, [elem, uuid()]];

      return Object.assign([...state], { [i]: repr });
    }

    case "REMOVE_OPTION": {
      const { index } = action;
      if (repr.kind !== "MCR" && repr.kind !== "RNKR") return state;
      repr.options.splice(index, 1);;
      return Object.assign([...state], { [i]: repr });
    }

    default: return state;
  };

};