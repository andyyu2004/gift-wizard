import friendicon1 from "../images/friend_placeholder1.png";
import friendicon11 from "../images/friend_placeholder11.png";
import friendicon12 from "../images/friend_placeholder12.png";
import friendicon13 from "../images/friend_placeholder13.png";
import friendicon2 from "../images/friend_placeholder2.png";
import friendicon3 from "../images/friend_placeholder3.png";
import friendicon4 from "../images/friend_placeholder4.png";
import friendicon5 from "../images/friend_placeholder5.png";
import friendicon6 from "../images/friend_placeholder6.png";
import { User } from "../types";

/** Hardcoding random ids for now, stops it from becoming annoying on refresh */
export const fakeusers: User[] = [
    {
        name: "Bob Lu",
        picture: friendicon1,
        userid: "43534535",
        wishlist: ["Scooter", "Tekken 7", "Naruto"],
        bio: "Bio: Captivated from life, showing it here."
    },
    {
        name: "Frank Chen",
        picture: friendicon2,
        userid: "637373454",
        wishlist: ["Unicorn", "Wand", "Invitation letter to Hogwarts"],
        bio: "Bio: Making the every day magical."
    },
    {
        name: "Johnny Tinko",
        picture: friendicon3,
        userid: "3453845903",
        wishlist: ["Camera", "Flight tickets to Tokyo", "GoPro"],
        bio: "Bio: Travel | Friend & Family | Life"
    },
    {
        name: "Travales Isoran",
        picture: friendicon4,
        userid: "348509345",
        wishlist: ["Laptop", "wireless keyboard", "A monitor"],
        bio: "Bio: Be strong....! I whisper to my WiFi signal."
    },
    {
        name: "Tinoro Lopez",
        picture: friendicon5,
        userid: "23080986",
        wishlist: ["HDMI Cable", "A pencil case", "Casio Calculator"],
        bio: "Bio: Stay humble. Be kind. Work hard."
    },
    {
        name: "Tamara Vusa",
        picture: friendicon11,
        userid: "0984308346",
        wishlist: ["Chocolate", "Sweets", "Godiva Giftcards"],
        bio: "Bio: Life is short…smile while you still have teeth."
    },
    {
        name: "Angelina Bukop",
        picture: friendicon12,
        userid: "2039092834",
        wishlist: ["Airpods", "Bose headphones", "Apple music Membership"],
        bio: "Bio: Being myself – Everyone else is taken."
    },
    {
        name: "Lisa Tyrone",
        picture: friendicon13,
        userid: "34095830846",
        wishlist: ["Nice coat", "Winter boots", "A scarf"],
        bio: "Bio: Your life does not get better by chance. It gets better by a change."
    },
    {
        name: "Dave Clave",
        picture: friendicon6,
        userid: "50698409586",
        wishlist: ["A dog", "A cat", "A goldfish"],
        bio: "Do you know what I like about people? Their dogs."
    },
];
