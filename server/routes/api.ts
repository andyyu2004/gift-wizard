import { Router } from 'express';
import { createUser, login } from '../controllers/user';
import bodyParser = require('body-parser');
import session = require('express-session');

const router = Router();
router.use(bodyParser.json());
router.use(session({
    secret: "temporary-secret",
    cookie: { secure: true },
    resave: false,
    saveUninitialized: true,
}));

router.get('/', (req, res) => {
    res.send("API Root");
});

router.post('/user/create', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newuser = await createUser(username, email, password);
        if (typeof newuser === "string") return res.status(422).json({ error: newuser });
        res.json({
            newuser,
        });
    } catch (err) {
        console.log(err);
    }

});

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

router.post('/user/logout', async (req, res) => {
    req.session?.destroy(error => {
        if (error) {
            console.log(`Error: ${error.message} (at api/user/login)`);
            return res.status(500).json({ error });
        }
        return res.status(200).send();
    });
});

router.post('/questionnaires/save', async (req, res) => {
    try {
        const { questionnaire } = req.body;
        if (!questionnaire) return res.status(400).json({
            error: "Require questionnaire",
        });

    } catch (error) {
        console.log(`Error ${error.message} (in api/questionnaires)`);
        return res.status(500).json({ error });
    }
});

router.get('/dbtest', (req, res) => {

});





export default router;


