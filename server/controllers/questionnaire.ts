import { Questionnaire } from "shared/types";
import { QuestionnaireModel, TQuestionnaire } from "../models/questionnaire";

/**
 * Saves questionnaire for a given userid
 */
export async function saveQuestionnaire(userid: string, questionnaire: Questionnaire): Promise<TQuestionnaire> {
    const { forms, background, label } = questionnaire;
    const q = await QuestionnaireModel.findOneAndUpdate({ label }, {
        userid, forms, background, label
    }, { upsert: true, new: true  });
    return await q.save();
}


export async function getQuestionnaires(userid: string) {
    console.log(await QuestionnaireModel.find());
    console.log(userid);
    const qs = await QuestionnaireModel.find({ userid });
    console.log("qs", qs);
    return qs;
}
