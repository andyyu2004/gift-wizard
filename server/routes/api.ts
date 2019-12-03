import { Router } from 'express';
import { createUser, mlogin } from '../controllers/user';
import bodyParser from 'body-parser';
import session from 'express-session';
import protectedRouter from './protected';
import adminRouter from './admin';

const router = Router();
router.use(session({
    secret: "temporary-secret",
    cookie: { httpOnly: true, maxAge: 600000000 },
    resave: false,
    saveUninitialized: false,
}));


router.use('/protected', protectedRouter);
router.use('/admin', adminRouter);

router.get('/', (req, res) => {
    console.log(req.session);
    res.send("API Root");
});

/** Create new user */
router.post('/user', async (req, res) => {
    const { username, email, password, picture } = req.body;
    try {
        (await createUser(username, email, password, picture))
            .map(user => res.json({ user }))
            .mapLeft(error => res.status(500).json({ error }));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

router.post('/user/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Require username and password" });
        const user = await mlogin(username, password);
        user.map(user => {
            req.session!.userid = user._id;
            req.session!.usertype = user.type;
            req.session?.save(err => { if (err) console.log(`Failed to save session ${err}`); });
            res.json({ user });
        }).mapLeft(error => res.status(422).json({ error }));
    } catch (error) {
        console.log(`Error: ${error.message} (at api/user/login)`);
        return res.status(500).json({ error });
    }

});

router.all('*', (req, res) => {
    res.status(404).send({ error: `API route not found: ${req.originalUrl}` });
});



export default router;


