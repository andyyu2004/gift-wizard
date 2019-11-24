import { Questionnaire, Left, Right, Either } from "shared/types";
import axios from 'axios';

export async function saveQuestionnaire(questionnaire: Questionnaire): Promise<Either<string, Questionnaire>> {
    const { data } = await axios.post('/api/protected/questionnaires/save', {
        questionnaire,
    });
    return data.error ? new Left(data.error) : new Right(data.questionnaire);
}

export async function loadUserQuestionnaires(userid: string): Promise<Either<string, Questionnaire[]>> {
    const { data } = await axios.get(`/api/protected/questionnaires/${userid}`);
    return data.error ? new Left(data.error) : new Right(data.questionnaires);
}