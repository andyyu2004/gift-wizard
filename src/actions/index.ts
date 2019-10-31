import { UserType } from "../types";
import { FormRepr } from "../components/QEdit";

// Use a discriminated union type
export type Action
    = UpdateUserTypeAction
    | SaveFormAction;

export interface UpdateUserTypeAction {
    type: "UPDATE_USER_TYPE";
    userType: UserType;
}

export interface SaveFormAction {
    type: "SAVE_FORM",
    label: string,
    form: FormRepr[],
}