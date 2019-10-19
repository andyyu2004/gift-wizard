import { Action, UpdateUserTypeAction } from "../actions";
import { UserType } from "../types";


export type AppState = {
    userType: UserType
}

const initialState: AppState = {
    userType: UserType.None,
};

const rootReducer = (state: AppState = initialState, action: Action) => {
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

export default rootReducer;

