import { login, createUser, logout } from './user';
import axios from 'axios';

/** Do not throw error on failure, manage manually */
axios.defaults.validateStatus = _ => true;

const API = {
    login,
    createUser,
    logout,
};

export default API;