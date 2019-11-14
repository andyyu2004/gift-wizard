import { UserType } from "shared/types";
import { Questionnaire } from "shared/types";

// Use a discriminated union type
export type Action
    = UpdateUserTypeAction
    | SaveQuestionnaireAction
    | LogoutAction
    | DeleteQTemplateAction;

export interface UpdateUserTypeAction {
    type: "UPDATE_USER_TYPE";
    userType: UserType;
}

export interface SaveQuestionnaireAction {
    type: "SAVE_FORM",
    questionnaire: Questionnaire,
}

export interface DeleteQTemplateAction {
    type: "DELETE_TEMPLATE",
    templateLabel: string,
}

export interface LogoutAction {
    type: "LOGOUT",
}
