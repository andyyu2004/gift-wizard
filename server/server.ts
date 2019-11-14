import express from 'express';
import apirouter from './routes/api';
import path from 'path';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import { MongoError } from 'mongodb';

const app = express();
app.use('/api', apirouter);
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "../../client/build")));

const PORT = process.env.PORT || 3001;

const dbuser = "user2";
const dbpassword = "ps";
const CONNECTION_STRING = `mongodb+srv://${dbuser}:${dbpassword}@gift-wizard-oqvnf.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, (err: MongoError) => {
    if (err) return console.log(`failed db connection ${err}`);
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.get('*', (req, res) => {
    res.status(404).send("404");
});


