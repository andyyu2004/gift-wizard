import { Router, Request, Response } from "express";
import { saveQuestionnaire, getQuestionnaires } from "../controllers/questionnaire";

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
        if (!questionnaire) return res.status(400).json({ error: "Require questionnaire" });
        const q = await saveQuestionnaire(req.session!.userid, questionnaire);
        return res.json({ questionnaire: q });
    } catch (error) {
        console.log(`Error ${error.message} (in api/questionnaires)`);
        return res.status(500).json({ error });
    }
});

router.get('/questionnaires/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        const questionnaires = await getQuestionnaires(userid);
        return res.json({ questionnaires });
    } catch (error) {
        console.log(`Error ${error.message} (in api/questionnaires/:userid)`);
        return res.status(500).json({ error });
    }
});

export default router;









