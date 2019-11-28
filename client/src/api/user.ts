import { User } from "shared/types";
import { Either, Left, Right } from 'shared/types/Either';
import axios from 'axios';
import defaultusericon from '../images/profile_pic_placeholder.png';
import { apiErrorHandler } from "./util";

export async function createUser(username: string, email: string, password: string): Promise<Either<string, User>> {
    return axios.post('/api/user', {
        username, email, password, picture: defaultusericon,
    })
    .then<any>(res => new Right(res.data.user))
    .catch(apiErrorHandler);
}

export async function login(username: string, password: string): Promise<Either<string, User>> {
    return axios.post('/api/user/login', { username, password })
        .then<any>(res => new Right(res.data.user))
        .catch(apiErrorHandler);
}

export async function getUser(userid: string): Promise<Either<string, User>> {
    return axios.get(`/api/protected/user/${userid}`)
        .then<any>(res => new Right(res.data.user))
        .catch(apiErrorHandler);
}

export async function logout(): Promise<Either<string, string>> {
    return axios.post('/api/protected/user/logout')
        .then<any>(res => new Right("Successfully logged out"))
        .catch(apiErrorHandler);
}

export async function patchUser(user: User): Promise<Either<string, User>> {
    return axios.patch(`/api/protected/user/${user._id}`, { user })
        .then<any>(res => new Right(res.data.user))
        .catch(apiErrorHandler);
}
