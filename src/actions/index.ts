import { UserType } from "../types";
import { Questionnaire } from "../types/FormTypes";

// Use a discriminated union type
export type Action
    = UpdateUserTypeAction
    | SaveQuestionnaireAction;

export interface UpdateUserTypeAction {
    type: "UPDATE_USER_TYPE";
    userType: UserType;
}

export interface SaveQuestionnaireAction {
    type: "SAVE_FORM",
    questionnaire: Questionnaire,
}