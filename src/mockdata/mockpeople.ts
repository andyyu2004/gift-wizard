import friendicon1 from "../images/friend_placeholder1.png";
import friendicon11 from "../images/friend_placeholder11.png";
import friendicon12 from "../images/friend_placeholder12.png";
import friendicon13 from "../images/friend_placeholder13.png";
import friendicon2 from "../images/friend_placeholder2.png";
import friendicon3 from "../images/friend_placeholder3.png";
import friendicon4 from "../images/friend_placeholder4.png";
import friendicon5 from "../images/friend_placeholder5.png";
import friendicon6 from "../images/friend_placeholder6.png";
import eilishicon from '../images/fake_user_profile.jpeg';
import { User } from "../types";

export const eilish: User = {
    firstname: "Billy",
    surname: "Eilish",
    username: "Eilish_1031",
    bio: "Music | Friend & Family | Life | 17 | Rolling Stone",
    phonenumber: "6476029798",
    email: "bil_eilish1031@gmail.com",
    date: "25/12/2000",
    country: "Canada",
    province: "Ontario",
    city: "Toronto",
    wishlist: ["A Good Voice"],
    picture: eilishicon,
    userid: "345987345",
};

/** Hardcoding random ids for now, stops it from becoming annoying on refresh */
export const fakeusers: User[] = [
    // {
        // name: 'Eilish'
    // },
    {
        firstname: "Bob",
        surname: "Lu",
        picture: friendicon1,
        userid: "43534535",
        wishlist: ["Scooter", "Tekken 7", "Naruto"],
        bio: "Bio: Captivated from life, showing it here."
    },
    {
        firstname: "Frank",
        surname: "Chen",
        picture: friendicon2,
        userid: "637373454",
        wishlist: ["Unicorn", "Wand", "Invitation letter to Hogwarts"],
        bio: "Bio: Making the every day magical."
    },
    {
        firstname: "Johnny",
        surname: " Tinko",
        picture: friendicon3,
        userid: "3453845903",
        wishlist: ["Camera", "Flight tickets to Tokyo", "GoPro"],
        bio: "Bio: Travel | Friend & Family | Life"
    },
    {
        firstname: "Travales",
        surname: "Isoran",
        picture: friendicon4,
        userid: "348509345",
        wishlist: ["Laptop", "wireless keyboard", "A monitor"],
        bio: "Bio: Be strong....! I whisper to my WiFi signal."
    },
    {
        firstname: "Tinoro",
        surname: "Lopez",
        picture: friendicon5,
        userid: "23080986",
        wishlist: ["HDMI Cable", "A pencil case", "Casio Calculator"],
        bio: "Bio: Stay humble. Be kind. Work hard."
    },
    {
        firstname: "Tamara",
        surname: "Vusa",
        picture: friendicon11,
        userid: "0984308346",
        wishlist: ["Chocolate", "Sweets", "Godiva Giftcards"],
        bio: "Bio: Life is short…smile while you still have teeth."
    },
    {
        firstname: "Angelina",
        surname: "Bukop",
        picture: friendicon12,
        userid: "2039092834",
        wishlist: ["Airpods", "Bose headphones", "Apple music Membership"],
        bio: "Bio: Being myself – Everyone else is taken."
    },
    {
        firstname: "Lisa",
        surname: "Tyrone",
        picture: friendicon13,
        userid: "34095830846",
        wishlist: ["Nice coat", "Winter boots", "A scarf"],
        bio: "Bio: Your life does not get better by chance. It gets better by a change."
    },
    {
        firstname: "Dave",
        surname: "Clave",
        picture: friendicon6,
        userid: "50698409586",
        wishlist: ["A dog", "A cat", "A goldfish"],
        bio: "Do you know what I like about people? Their dogs."
    },
];
