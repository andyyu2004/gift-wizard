export { default as UserType } from './UserType';

export type Friend = {
    userid: string,
    relationship: string,
};

export type User = {
    userid: string,
    bio: string,
    wishlist: string[],
    firstname: string,
    surname: string,
    picture: string,
    email?: string,
    phonenumber?: string,
    date?: string,
    username?: string,
    country?: string,
    province?: string,
    city?: string,

};
