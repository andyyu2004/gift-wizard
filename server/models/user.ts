import { model, Schema, Document } from 'mongoose';
import { User, UserType } from 'shared/types';

type TUserModel = User & Document;
const UserModel = model<TUserModel>("User", new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: String,
    wishlist: [String],
    interests: [String],
    friends: [String],
    firstname: String,
    surname: String,
    picture: String,
    email: String,
    phonenumber: String,
    date: String,
    country: String,
    province: String,
    city: String,
    type: String,
}));

export {
    UserModel,
    TUserModel,
}

