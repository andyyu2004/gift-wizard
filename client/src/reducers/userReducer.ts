import { Action } from "../actions"
import { UserType, User } from "shared/types";

export interface UserState {
    user?: User;
}

export const initialUserState: UserState = {};

const userReducer = (state: UserState = initialUserState, action: Action) => {
    switch (action.type) {
        case "SET_USER": {
            const { user } = action;
            console.log('user', user);
            return {
                ...state,
                user,
            };
        }

        case "LOGOUT": {
            return {
                user: undefined,
            };
        }

        default: return state;
    }
}


export default userReducer;