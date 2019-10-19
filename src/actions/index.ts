import { UserType } from "../types";

// Use a discriminated union type
export type Action =
    UpdateUserTypeAction
    | SomeOtherActionTest;

export interface SomeOtherActionTest { 
    type: "BAD_ACTION";
    payload: {};
 }

export interface UpdateUserTypeAction {
    type: "UPDATE_USER_TYPE";
    payload: { userType: UserType };
}