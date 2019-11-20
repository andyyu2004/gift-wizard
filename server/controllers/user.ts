import { UserModel, TUserModel } from "../models";
import { UserType } from "shared/types";

export async function createUser(username: string, email: string, password: string): Promise<TUserModel | string> {
    const user = await UserModel.findOne({ username });
    if (user) return "User already exists";
    const newuser = new UserModel({
        username,
        email,
        password,
        bio: "Default Biography",
        wishlist: [],
        interests: [],
        type: UserType.Regular,
    });

    await newuser.save();
    delete newuser.password;
    return newuser;
}

export async function login(username: string, password: string): Promise<TUserModel | string> {
    const user = await UserModel.findOne({ username });
    if (!user) return "User does not exist";
    // Added hashing etc later
    if (password !== user.password) return "Incorrect Password";
    return user;
}

