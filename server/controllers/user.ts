import { UserModel, TUserModel } from "../models";
import { UserType, Either, Left, Right } from "shared/types";
import bcrypt from "bcrypt";

export async function createUser(username: string, email: string, password: string, picture: string): Promise<Either<string, TUserModel>> {
    const user = await UserModel.findOne({ username });
    if (user) return new Left("User already exists");

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newuser = new UserModel({
        username,
        email,
        picture,
        password: hash,
        bio: "Default Biography",
        wishlist: [],
        interests: [],
        friends: [],
        type: UserType.Regular,
    });

    newuser.save();
    delete newuser.password;
    return new Right(newuser);
}

export async function getUser(userid: string): Promise<Either<string, TUserModel>> {
    const user = await UserModel.findById(userid);
    if (!user) return new Left("User does not exist");
    return new Right(user);
}

export async function mlogin(username: string, password: string): Promise<Either<string, TUserModel>> {
    const user = await UserModel.findOne({ username });
    if (!user?.password) return new Left("User does not exist");

    const comp = await bcrypt.compare(password, user.password);
    if (!comp) return new Left("Incorrect Password");
    delete user.password;
    return new Right(user);
}

