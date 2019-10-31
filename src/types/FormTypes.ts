import { FormRepr } from "../components/QEdit";

export type Questionnaire = {
    label: string,
    forms: FormRepr[],
    background?: string,
  };
  
  /** Non Optional Fields for Form Actions are:
   * formid
   *  type;
   */
  export type FormAction
    = SetShortAnswerAction
    | AddFormAction
    | SetCheckboxStatusAction
    | UpdateOptionAction
    | UpdateRatingAction
    | SetQuestionAction
    | ReorderRankAction
    | AddOptionAction
    | RemoveOptionAction;
  
  export type SetShortAnswerAction = {
    type: "SET_SHORT_ANSWER",
    formId: string,
    answer: string,
  }
  
  export type AddFormAction = {
    type: "ADD_FORM",
    formId: string,
    form: FormRepr,
  }
  
  export type SetQuestionAction = {
    type: "SET_QUESTION",
    formId: string,
    question: string,
  }
  
  /** Check or uncheck the flag belonging to the string 'option' */
  export type SetCheckboxStatusAction = {
    type: "SET_CHECK_BOX_STATUS",
    index: number,
    status: boolean,
    formId: string,
  };
  
  /** Changes the option of the checkbox 
   *  Uses index to identify the element as the string has changed
  */
  export type UpdateOptionAction = {
    type: "UPDATE_OPTION",
    formId: string,
    newOption: string,
    index: number,
  };
  
  export type UpdateRatingAction = {
    type: "UPDATE_RATING",
    formId: string,
    rating: number,
  };
  
  export type ReorderRankAction = {
    type: "REORDER_RANK",
    sourceIndex: number,
    destIndex: number,
    formId: string,
  };
  
  export type AddOptionAction = {
    type: "ADD_OPTION",
    formId: string,
    elem: any,
  };
  
  export type RemoveOptionAction = {
    type: "REMOVE_OPTION",
    formId: string,
    index: number,
  };
  