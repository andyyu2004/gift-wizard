import { User } from "shared/types";
import { Either, Left, Right } from 'shared/types/Either';
import axios from 'axios';

export async function createUser(username: string, email: string, password: string): Promise<Either<string, User>> {
    const { data } = await axios.post('/api/user/create', {
        username, email, password
    });
    return data.error ? new Left(data.error) : new Right(data.newuser);
}

export async function login(username: string, password: string): Promise<Either<string, User>> {
    const res = await axios.post('/api/user/login', {
        username, password,
    });
    console.log(res);
    const data = res.data;
    return data.error ? new Left(data.error) : new Right(data.user);
}

export async function logout(): Promise<Either<string, string>> {
    const { data } = await axios.post('/api/user/logout');
    return data.error ? new Left(data.error) : new Right("Successfully logged out");
}
