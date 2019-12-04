import { login, createUser, logout, getUser, patchUser, getAllUsers, getFriends } from './user';
import { saveQuestionnaire, loadUserQuestionnaires, saveRepoQuestionnaire, loadAllQuestionnaires, sendQuestionnaire, loadReceived } from './questionnaire';
import axios from 'axios';

axios.defaults.withCredentials = true;

const API = {
    login,
    createUser,
    logout,
    saveQuestionnaire,
    loadUserQuestionnaires,
    getUser,
    patchUser,
    getAllUsers,
    getFriends,
    saveRepoQuestionnaire,
    loadAllQuestionnaires,
    sendQuestionnaire,
    loadReceived,
};

export default API;