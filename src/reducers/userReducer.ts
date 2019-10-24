import { Action } from "../actions"
import { UserType } from "../types";

export interface UserState {
    userType: UserType,
}

export const initialUserState: UserState = {
    userType: UserType.None,
}

const userReducer = (state: UserState = initialUserState, action: Action) => {
    switch (action.type) {
        case "UPDATE_USER_TYPE": {
            const { userType } = action.payload;
            return {
                ...state,
                userType: userType,
            };
        }
        default: return state;
    }
}


export default userReducer;