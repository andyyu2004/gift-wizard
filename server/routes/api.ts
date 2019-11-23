import { Router } from 'express';
import { createUser, login, mlogin } from '../controllers/user';
import bodyParser from 'body-parser';
import session from 'express-session';
import protectedRouter from './protected';
import cors from 'cors';

const router = Router();
router.use(bodyParser.json());
router.use(session({
    secret: "temporary-secret",
    cookie: { httpOnly: true, maxAge: 600000000 },
    resave: false,
    saveUninitialized: false,
}));


router.use('/protected', protectedRouter);

router.get('/', (req, res) => {
    console.log(req.session);
    res.send("API Root");
});

router.post('/user/create', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newuser = await createUser(username, email, password);
        if (typeof newuser === "string") return res.status(422).json({ error: newuser });
        res.json({ newuser });
    } catch (err) {
        console.log(err);
    }

});

router.post('/user/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Require username and password" });
        const user = await mlogin(username, password);
        user.map(user => {
            req.session!.userid = user._id;
            req.session?.save(err => { if (err) console.log(`Failed to save session ${err}`); });
            res.json({ user });
        }).mapLeft(error => {
            res.status(200).json({ error })
        });

    } catch (error) {
        console.log(`Error: ${error.message} (at api/user/login)`);
        return res.status(500).json({ error });
    }

});

// Implementation with try/catch + error codes instead of Either<L, R>
router.post('/user/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({
            error: "Require username and password",
        });

        const user = await login(username, password).catch(e => { throw e });
        if (typeof user === "string") return res.status(422).json({ error: user });

        req.session!.userid = user.userid;

        return res.json({ user });
    } catch (error) {
        console.log(`Error: ${error.message} (at api/user/login)`);
        return res.status(500).json({ error });
    }
});




export default router;


