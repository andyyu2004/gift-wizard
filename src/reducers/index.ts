import { combineReducers } from "redux";
import formReducer, { FormState } from "./formReducer";
import themeReducer, { ThemeState } from "./themeReducer";
import userReducer, { UserState } from "./userReducer";


export type AppState = {
    user: UserState,
    theme: ThemeState,
    forms: FormState,
};

const rootReducer = combineReducers({
    user: userReducer,
    forms: formReducer,
    theme: themeReducer,
});

export default rootReducer;

