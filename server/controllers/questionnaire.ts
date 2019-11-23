import { Questionnaire } from "shared/types";
import { QuestionnaireModel, TQuestionnaire } from "../models/questionnaire";

/**
 * Saves questionnaire for a given userid
 */
export async function saveQuestionnaire(userid: string, questionnaire: Questionnaire): Promise<TQuestionnaire> {
    const { forms, background, label } = questionnaire;
    const q = new QuestionnaireModel({
        userid,
        forms,
        label,
        background,
    });

    return await q.save();
}


export async function getQuestionnaires(userid: string) {
    // console.log(await QuestionnaireModel.find());
    return await QuestionnaireModel.find({ userid });
}
