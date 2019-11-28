import { UserType, User, Questionnaire, Notification } from "shared/types";

/* Use a discriminated union type */
export type Action
    = UpdateUserTypeAction
    | SaveQuestionnaireAction
    | LogoutAction
    | DeleteQTemplateAction
    | UpdateUserAction
    | SetUserAction;

export interface UpdateUserTypeAction {
    type: "UPDATE_USER_TYPE";
    userType: UserType;
}

/** Use for first time login */
export interface SetUserAction {
    type: "SET_USER",
    user: User,
    socket: SocketIOClient.Socket,
}

export interface UpdateUserAction {
    type: "UPDATE_USER",
    user: User,
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
