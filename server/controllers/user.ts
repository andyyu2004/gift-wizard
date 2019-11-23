import { UserModel, TUserModel } from "../models";
import { UserType, Either, Left, Right } from "shared/types";
import bcrypt from "bcrypt";

export async function createUser(username: string, email: string, password: string): Promise<TUserModel | string> {
    const user = await UserModel.findOne({ username });
    if (user) return "User already exists";

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newuser = new UserModel({
        username,
        email,
        password: hash,
        bio: "Default Biography",
        wishlist: [],
        interests: [],
        type: UserType.Regular,
    });

    newuser.save();
    delete newuser.password;
    return newuser;
}

export async function login(username: string, password: string): Promise<TUserModel | string> {
    const user = await UserModel.findOne({ username });
    if (!user?.password) return "User does not exist";
    // Added hashing etc later
    if (!(await bcrypt.compare(password, user.password))) return "Incorrect Password";
    delete user.password;
    return user;
}

export async function mlogin(username: string, password: string): Promise<Either<string, TUserModel>> {
    const user = await UserModel.findOne({ username });
    if (!user?.password) return new Left("User does not exist");

    const comp = await bcrypt.compare(password, user.password);
    if (!comp) return new Left("Incorrect Password");
    delete user.password;
    return new Right(user);
}

