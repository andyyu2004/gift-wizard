import { login, createUser, logout, getUser, patchUser } from './user';
import { saveQuestionnaire, loadUserQuestionnaires } from './questionnaire';
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
};

export default API;