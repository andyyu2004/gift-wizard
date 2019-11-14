import { UserModel, TUserModel } from "../models";

export async function createUser(username: string, email: string, password: string): Promise<TUserModel | string> {
    const user = await UserModel.findOne({ username });
    if (user) return "User already exists";
    const newuser = new UserModel({
        username,
        email,
        password,
    });
    await newuser.save();
    delete newuser.password;
    console.log(newuser);
    return newuser;
}

export async function login(username: string, password: string): Promise<TUserModel | string> {
    const user = await UserModel.findOne({ username });
    if (!user) return "User does not exist";

    return user;
}

