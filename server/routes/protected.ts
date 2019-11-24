import { Router, Request, Response } from "express";
import { saveQuestionnaire, getQuestionnaires } from "../controllers/questionnaire";
import { getUser, patchUser } from '../controllers/user';

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

router.post('/user/logout', async (req, res) => {
    req.session?.destroy(error => {
        if (error) {
            console.log(`Error: ${error.message} (at api/user/login)`);
            return res.status(500).json({ error });
        }
        return res.status(200).send();
    });
});

router.patch('/user/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        const { user } = req.body;
        if (userid != req.session!.userid) return res.status(403).send({ error: "Unauthorized to patch other users profiles "});
        (await patchUser(user))
            .map(user => res.send({ user }))
            .mapLeft(error => res.status(400).send({ error }));
    } catch (error) {
        console.log(`Error: ${error.message} (in PATCH /protected/user/:userid)`);
        return res.status(500).json({ error: error.message });
    }
});

router.post('/questionnaires/save', async (req, res) => {
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

router.get('/questionnaires/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        const questionnaires = await getQuestionnaires(userid);
        return res.json({ questionnaires });
    } catch (error) {
        console.log(`Error ${error.message} (in api/questionnaires/:userid)`);
        return res.status(500).json({ error: error.message });
    }
});


export default router;









