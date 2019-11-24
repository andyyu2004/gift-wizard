
export type User = {
    _id: string,
    bio: string,
    wishlist: string[],
    interests: string[],
    firstname?: string,
    surname?: string,
    picture?: string,
    email?: string,
    phonenumber?: string,
    date?: string,
    username?: string,
    country?: string,
    province?: string,
    city?: string,
    password?: string,
    type: UserType,
    friends: string[],
};

export type Friend = {
    userid: string,
    relationship: string,
};

export enum UserType {
    Admin = "ADMIN",
    Regular = "REGULAR",
    None = "NONE", // i.e. not logged in
};
