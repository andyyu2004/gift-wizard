import { Router, Request, Response, NextFunction } from 'express';
import { UserType } from 'shared/types';
import { saveQToRepo } from '../controllers/questionnaire';

const router = Router();

const adminChecker = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.userid) res.status(401).send("Unauthenticated: please login");
    if (req.session?.usertype != UserType.Admin) res.status(403).send("Unauthorized");
    next();
}

router.use(adminChecker);

router.get('/', (req, res) => res.send("Admin Root"));

router.post('/repo', async (req, res) => {
    try {
        const { questionnaire } = req.body;
        if (!questionnaire) return res.status(400).json({ error: "Require questionnaire" });
        const q = await saveQToRepo(questionnaire).catch(err => { throw err });
        return res.json({ questionnaire: q });
    } catch (error) {
        console.log(`Error ${error.message} (in POST api/admin/repo)`);
        return res.status(500).json({ error: error.message });
    }
});

export default router;
