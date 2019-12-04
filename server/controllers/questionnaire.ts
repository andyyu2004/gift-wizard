import { Questionnaire } from "shared/types";
import { QuestionnaireModel, TQuestionnaire, QRepoModel, TQMail, QMailModel, TQRepo } from "../models/questionnaire";

/**
 * Saves questionnaire for a given userid
 */
export async function saveQuestionnaire(userid: string, questionnaire: Questionnaire): Promise<TQuestionnaire> {
    const { forms, background, label } = questionnaire;
    /** Questionnaires are unique by label, so update the old one if it exists */
    const q = await QuestionnaireModel.findOneAndUpdate({ label }, {
        userid, forms, background, label
    }, { upsert: true, new: true  });
    return await q.save();
}

export async function getQuestionnaires(userid: string) {
    // console.log(await QuestionnaireModel.find());
    return await QuestionnaireModel.find({ userid });
}

export async function saveQToRepo(questionnaire: Questionnaire): Promise<TQRepo> {
    const { forms, background, label } = questionnaire;
    const q = await QRepoModel.findOneAndUpdate({ label }, {
        forms, background, label
    }, { upsert: true, new: true });
    return await q.save();
}

export async function getRepoQuestionnaires(): Promise<TQRepo[]> {
    return await QRepoModel.find();
}

export async function sendQuestionnaire(sender: string, receiver: string, questionnaire: Questionnaire): Promise<TQMail> {
    const mail = new QMailModel({ sender, receiver, questionnaire });
    return await mail.save();
}

export async function getReceived(receiver: string): Promise<TQMail[]> {
    return await QMailModel.find({ receiver });
}
