import express from 'express';
import apirouter from './routes/api';
import path from 'path';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import { MongoError } from 'mongodb';
import cors from 'cors';

const app = express();

app.use('/api', apirouter);
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "../../client/build")));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

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
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
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



