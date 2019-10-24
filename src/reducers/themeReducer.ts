import { Action } from "../actions"

export interface ThemeState {
    [key: string]: string,
}

export const initialThemeState: ThemeState = {
    "colorDark": "#66B3FF",
    "colorLight": "#C4E1FF"
};

const themeReducer = (state: ThemeState = initialThemeState, action: Action) => {
    return state;
};

export default themeReducer;