import { Router, Request, Response } from "express";
import { saveQuestionnaire, getQuestionnaires, getRepoQuestionnaires, sendQuestionnaire, getReceived, getSent } from "../controllers/questionnaire";
import { getUser, patchUser, getUsers, getFriends } from '../controllers/user';

const router = Router();

router.use(sessionChecker);

router.get('/', (req, res) => {
    res.send("protected root")
});

function sessionChecker(req: Request, res: Response, next: Function) {
    // Unauthenticated not forbidden
    // console.log(`Entity accessing protected route`, req.session);
    if (!req.session?.userid) return res.status(401).json({ error: "Unauthenticated! Please login." });
    next();
};

/** Get user by userid */
router.get('/user/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        (await getUser(userid).catch(err => { throw err }))
            .map(user => res.send({ user }))
            .mapLeft(error => res.status(400).send({ error }));
    } catch (error) {
        console.log(`Error: ${error.message} (in GET /protected/user/:userid)`);
        return res.status(500).json({ error: error.message });
    }
});

router.get('/user/:userid/friends', async (req, res) => {
    try {
        const { userid } = req.params;
        (await getFriends(userid))
            .map(friends => res.send({ friends }))
            .mapLeft(error => res.status(400).send({ error }));
    } catch (error) {
        console.log(`Error: ${error.message} (in GET /protected/user/:userid/friends)`);
        return res.status(500).json({ error: error.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        let users = await getUsers().catch(err => { throw err; });
        res.json({ users });
    } catch (error) {
        console.log(`Error: ${error.message} (in GET /protected/users)`);
        return res.status(500).json({ error: error.message });
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

/** Patch user by userid */
router.patch('/user', async (req, res) => {
    try {
        const { user } = req.body;
        (await patchUser(req.session.userid, user))
            .map(user => res.send({ user }))
            .mapLeft(error => res.status(400).send({ error }));
    } catch (error) {
        console.log(`Error: ${error.message} (in PATCH /protected/user/:userid)`);
        return res.status(500).json({ error: error.message });
    }
});

/** Upsert a questionnaire */
router.post('/questionnaire', async (req, res) => {
    try {
        const { questionnaire } = req.body;
        if (!questionnaire) return res.status(400).json({ error: "Require questionnaire" });
        const q = await saveQuestionnaire(req.session!.userid, questionnaire).catch(err => { throw err });
        return res.json({ questionnaire: q });
    } catch (error) {
        console.log(`Error ${error.message} (in api/questionnaires)`);
        return res.status(500).json({ error: error.message });
    }
});

/** Get all repository questionnaire templates */
router.get('/questionnaires', async (req, res) => {
    try {
        const questionnaires = await getRepoQuestionnaires().catch(err => { throw err });
        return res.json({ questionnaires });
    } catch (error) {
        console.log(`Error ${error.message} (in POST api/admin/repo)`);
        return res.status(500).json({ error: error.message });
    }
});

router.get('/questionnaires/received', async (req, res) => {
    getReceived(req.session!.userid)
        .then(mail => res.send({ mail }))
        .catch(err => res.status(500).send({ error: err.message }));
});

router.get('/questionnaires/sent', async (req, res) => {
    getSent(req.session!.userid)
        .then(mail => res.send({ mail }))
        .catch(err => res.status(500).send({ error: err.message }));
});

/** Get saved questionnaires for a user */
router.get('/questionnaires/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        const questionnaires = await getQuestionnaires(userid).catch(err => { throw err; });
        return res.json({ questionnaires });
    } catch (error) {
        console.log(`Error ${error.message} (in api/questionnaires/:userid)`);
        return res.status(500).json({ error: error.message });
    }
});

/** Send a questionnaire from current user to :receiverid */
router.post('/questionnaires/:receiverid', async (req, res) => {
    const { receiverid } = req.params;
    const { questionnaire } = req.body;
    sendQuestionnaire(req.session!.userid, receiverid, questionnaire)
        .then(questionnaires => res.send({ questionnaires }))
        .catch(err => res.status(500).send({ error: err.message }));
});


export default router;







