import { User } from "shared/types";
import { Either, Left, Right } from 'shared/types/Either';
import axios from 'axios';
import defaultusericon from '../images/profile_pic_placeholder.png';

export async function createUser(username: string, email: string, password: string): Promise<Either<string, User>> {
    const { data } = await axios.post('/api/user/create', {
        username, email, password, picture: defaultusericon,
    });
    return data.error ? new Left(data.error) : new Right(data.user);
}

export async function login(username: string, password: string): Promise<Either<string, User>> {
    const { data } = await axios.post('/api/user/login', {
        username, password,
    });
    return data.error ? new Left(data.error) : new Right(data.user);
}

export async function getUser(userid: string): Promise<Either<string, User>> {
    const { data } = await axios.get(`/api/protected/user/${userid}`);
    return data.error ? new Left(data.error) : new Right(data.user);
}

export async function logout(): Promise<Either<string, string>> {
    const { data } = await axios.post('/api/protected/user/logout');
    return data.error ? new Left(data.error) : new Right("Successfully logged out");
}

export async function patchUser(user: User): Promise<Either<string, User>> {
    const { data } = await axios.patch(`/api/protected/user/${user._id}`, { user });
    return data.error ? new Left(data.error) : new Right(data.user);
}
