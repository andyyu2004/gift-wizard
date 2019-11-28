import { model, Schema, Document } from 'mongoose';
import { User, UserType, Notification, NotificationType } from 'shared/types';

export type TNotification = Notification & Document;
const NotificationSchema = new Schema({
    msg: String,
    sender: Schema.Types.ObjectId,
    type: Schema.Types.Mixed,
    creationTime: Date,
});

export const NotificationModel = model<TNotification>("Notification", NotificationSchema);

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
    notifications: [NotificationSchema],
}));

export {
    UserModel,
    TUserModel,
}

