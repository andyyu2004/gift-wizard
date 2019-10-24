import { Action } from "../actions"

export interface ThemeState {
    [key: string]: string,
}

export const initialThemeState: ThemeState = {
    
}

const themeReducer = (state: ThemeState = initialThemeState, action: Action) => {
    return state;
};

export default themeReducer;