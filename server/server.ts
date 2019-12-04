import express from 'express';
import apirouter from './routes/api';
import path from 'path';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import { MongoError } from 'mongodb';
import cors from 'cors';
import socketio from 'socket.io';
import http from 'http';
import { addNotification, getUser, dismissNotification, acceptRequest } from './controllers/user';
import { NotificationType } from 'shared/types';

const app = express();
const server = http.createServer(app);

app.use(bodyparser.json({
    limit: "50mb",
}));

app.use('/api', apirouter);
app.use(express.static(path.join(__dirname, "../../client/build")));

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));

const PORT = process.env.PORT || 3001;

const dbuser = "user2";
const dbpassword = "ps";
const CONNECTION_STRING = `mongodb+srv://${dbuser}:${dbpassword}@gift-wizard-oqvnf.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
}, (err: MongoError) => {
    if (err) return console.log(`failed db connection ${err}`);

    server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
});

/** Temporary convenience for clearing database
 *  Just make it a get so its accessible from browser directly */
app.get('/drop', async (req, res) => {
    try {
        await mongoose.connection.dropDatabase();
        res.send("ok");
    } catch (err) {
        res.status(500).send(err);
    }

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

/* Socket stuff */

const io = socketio(server);
/** mapping :: <userid> -> <socketid> */
const socketmap = {}

io.on('connection', socket => {

    const { userid } = socket.handshake.query;
    socketmap[userid] = socket.id;

    // console.log(`user connected ${userid}`);

    /** Receives parameter of friend id */
    socket.on('send-f-req', async fid => {
        // console.log(`user ${userid} sent f-req to ${fid}`);
        (await getUser(userid)).map(async user => {
            await addNotification(fid, `${user.username} would like to add you as a friend!`, userid, NotificationType.FriendReq);
            io.to(socketmap[fid]).emit("refresh-notifications");
        });
    });

    socket.on('dismiss', async nid => {
        // console.log(`dismissing notification ${nid}`);
        await dismissNotification(userid, nid);
        socket.emit('refresh-notifications');
    });

    /** Receives parameter of sender id */
    socket.on('accept-f-req', async sid => {
        // console.log(`user ${userid} accepts request from ${sid}`);
        (await acceptRequest(userid, sid)).map(async _ => {
            socket.emit('success', "Successfully added friend");
            (await getUser(userid)).map(async user => {
                await addNotification(sid, `${user.username} accepted your friend request`, userid, NotificationType.General);
                io.to(socketmap[sid]).emit('refresh-notifications');
            });
        })
        .mapLeft(err => socket.emit('err', err));
    });

    socket.on('disconnect', () => {
        // console.log(`user disconnected ${userid}`);
        delete socketmap[userid];
    });
});
















