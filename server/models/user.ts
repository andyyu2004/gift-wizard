import { model, Schema, Document } from 'mongoose';
import { User } from 'shared/types';

type TUserModel = User & Document;
const UserModel = model<TUserModel>("User", new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}));

export {
    UserModel,
    TUserModel,
}

