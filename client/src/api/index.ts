import { login, createUser } from './user';
import axios from 'axios';

axios.defaults.validateStatus = _ => true;

const API = {
    login,
    createUser,
};

export default API;