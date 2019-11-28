export enum NotificationType {
    FriendReq = "FriendReq",
    General   = "General",
}

export type Notification = {
    _id: string,
    msg: string,
    sender: string, // Id of the person who sent the notification
    creationTime: Date,
    type: NotificationType,
};

