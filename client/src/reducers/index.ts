import { combineReducers } from "redux";
import formReducer, { FormState } from "./formReducer";
import themeReducer, { ThemeState } from "./themeReducer";
import userReducer, { UserState } from "./userReducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export type AppState = {
    user: UserState,
    theme: ThemeState,
    forms: FormState,
    socket: SocketIOClient.Socket,
};

const userPersistConfig = {
    key: 'user',
    storage,
    blacklist: ['socket'],
};

const formsPersistConfig = {
    key: 'forms',
    storage,
};

const themePersistConfig = {
    key: 'theme',
    storage,
};
   
const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
const formPersistedReducer = persistReducer(formsPersistConfig, formReducer);
const themePersistedReducer = persistReducer(themePersistConfig, themeReducer);

const rootReducer = combineReducers({
    user: userPersistedReducer,
    forms: formPersistedReducer,
    theme: themePersistedReducer,
});

export default rootReducer;

