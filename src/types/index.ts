export { default as UserType } from './UserType';

export type Friend = {
    userid: string,
    relationship: string,
};

export type User = {
    userid: string,
    bio: string,
    wishlist: string[],
    name: string,
    picture: string,
};
