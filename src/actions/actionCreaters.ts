import { UserType } from "../types";
import { UpdateUserTypeAction } from ".";

export const updateUserType: (userType: UserType) => UpdateUserTypeAction = userType => ({
    type: "UPDATE_USER_TYPE",
    payload: { userType }
});

