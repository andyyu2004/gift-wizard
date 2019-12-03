export declare enum NotificationType {
    FriendReq = "FriendReq",
    General = "General"
}
export declare type Notification = {
    _id: string;
    msg: string;
    sender: string;
    creationTime: Date;
    type: NotificationType;
};
