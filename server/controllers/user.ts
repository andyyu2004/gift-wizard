import { NotificationModel, UserModel, TUserModel, TNotification } from "../models";
import { UserType, Either, Left, Right, User, NotificationType, IEither } from "shared/types";
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
        country: "",
        province: "",
        city: "",
        phonenumber: "",
        firstname: "",
        surname: "",
        type: UserType.Regular,
        notifications: [],
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

export async function getUsers(): Promise<TUserModel[]> {
    return await UserModel.find();
}

export async function patchUser(user: User): Promise<Either<string, TUserModel>> {
    const updatedUser = await UserModel.findOneAndUpdate({ _id: user._id }, user, { new: true });
    if (!updatedUser) return new Left("Update failed");
    return new Right(await updatedUser.save());
}

export async function addNotification(userid: string, msg: string, sender: string, type: NotificationType) {
    const notification: TNotification = new NotificationModel({ msg, sender, type, creationTime: new Date() });
    (await getUser(userid)).map(async user => {
        user.notifications.push(notification);
        await user.save();
    });
}

/** nid :: notification_id */
export async function dismissNotification(userid: string, nid: string) {
    (await getUser(userid)).map(async user => {
        const index = user.notifications.findIndex(x => x._id === nid);
        user.notifications.splice(index, 1);
        await user.save();
    });
}

export async function mlogin(username: string, password: string): Promise<Either<string, TUserModel>> {
    const user = await UserModel.findOne({ username });
    if (!user?.password) return new Left("User does not exist");

    const comp = await bcrypt.compare(password, user.password);
    if (!comp) return new Left("Incorrect Password");
    delete user.password;
    return new Right(user);
}

export async function getFriends(userid: string): Promise<IEither<string, TUserModel[]>> {
    return (await getUser(userid)).bindAsync(async user => new Right(await UserModel.find().where('_id').in(user.friends).exec()));
}

export const addToFriendList: (user: TUserModel, fid: string) => Promise<Either<string, TUserModel>> = async (user, fid) => {
    const friends = user.friends;
    const friend = friends.find(x => x === fid);
    // If friend already added
    if (friend) return new Left("User is already a friend");
    friends.push(fid);
    return new Right(await user.save());
}

/** Attempt to accempt friend request from user with id = fid */
export const acceptRequest = async (userid: string, fid: string) => (await getUser(userid))
    .bindAsync(user => addToFriendList(user, fid))
    .then(() => getUser(fid)) // Add connection to both users' friend list
    .then(user => user.bindAsync(user => addToFriendList(user, userid)));








