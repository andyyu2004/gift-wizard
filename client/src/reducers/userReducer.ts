import { User } from "shared/types";
import { Action } from "../actions";

export interface UserState {
    user?: User;
    socket?: SocketIOClient.Socket,
}

export const initialUserState: UserState = {};

const userReducer = (state: UserState = initialUserState, action: Action) => {
    switch (action.type) {
        case "SET_USER": {
            const { user, socket } = action;
            return {
                ...state,
                user,
                socket,
            };
        }

        case "UPDATE_USER": {
            const { user } = action;
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