import { combineReducers } from "redux";
import themeReducer, { initialThemeState, ThemeState } from "./themeReducer";
import userReducer, { initialUserState, UserState } from "./userReducer";


export type AppState = {
    user: UserState,
    theme: ThemeState,
}

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
});

export default rootReducer;

