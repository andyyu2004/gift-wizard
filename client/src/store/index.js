import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import socketio from 'socket.io-client';

const rootPersistConfig = {
    key: 'root',
    storage,
    // stateReconciler: autoMergeLevel2,
    blacklist: ['forms', 'user', 'theme'], // Prevent it from persisting each thing sub reducer twice
};

const rootPersistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = createStore(
    rootPersistedReducer,
    applyMiddleware(logger)
);

export const persistor = persistStore(store, {}, () => {
    const state = store.getState();
    /* Refresh socket */
    state.user.socket = socketio('/', { query: `username=${state.user.username}` });
});

