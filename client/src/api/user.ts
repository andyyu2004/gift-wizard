import { User } from "shared/types";
import { Either, Left, Right } from 'shared/types/Either';
import axios from 'axios';

export async function createUser(username: string, email: string, password: string): Promise<Either<string, User>> {
    const { data } = await axios.post('/api/user/create', {
        username, email, password
    });
    console.log(data);
    return data.error ? new Left(data.error) : new Right(data.newuser);
}

export async function login(username: string, password: string): Promise<Either<string, User>> {
    const { data } = await axios.post('/api/user/login', {
        username, password,
    });
    // console.log(data);
    return data.error ? new Left(data.error) : new Right(data.user);
}
