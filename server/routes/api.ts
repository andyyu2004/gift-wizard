import { Router } from 'express';
import { createUser, login } from '../controllers/user';
import bodyParser = require('body-parser');

const router = Router();
router.use(bodyParser.json());

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
        console.log(`request to login ${username}`);
        if (!username || !password) return res.status(400).json({
            error: "Require username and password",
        });

        const user = await login(username, password).catch(e => { throw e });
        if (typeof user === "string") return res.status(422).json({ error: user });
        return res.json({ user });
    } catch (error) {
        console.log(`Error: error.message (at api/user/login)`);
        return res.status(500).json({ error });
    }
});

router.get('/dbtest', (req, res) => {

});





export default router;


