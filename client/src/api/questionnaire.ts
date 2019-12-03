import { Questionnaire, Left, Right, Either } from "shared/types";
import axios from 'axios';
import { apiErrorHandler } from "./util";

export async function saveQuestionnaire(questionnaire: Questionnaire): Promise<Either<string, Questionnaire>> {
    return axios.post('/api/protected/questionnaire', { questionnaire })
    .then<any>(res => new Right(res.data.questionnaire))
    .catch(apiErrorHandler);
}

export async function loadUserQuestionnaires(userid: string): Promise<Either<string, Questionnaire[]>> {
    return axios.get(`/api/protected/questionnaires/${userid}`)
        .then<any>(res => new Right(res.data.questionnaires))
        .catch(apiErrorHandler);
}

export async function loadAllQuestionnaires(): Promise<Either<string, Questionnaire[]>> {
    return axios.get(`/api/protected/questionnaires`)
        .then<any>(res => new Right(res.data.questionnaires))
        .catch(apiErrorHandler);
}

export async function saveRepoQuestionnaire(questionnaire: Questionnaire): Promise<Either<string, Questionnaire>> {
    return axios.post('/api/admin/repo', { questionnaire })
    .then<any>(res => new Right(res.data.questionnaire))
    .catch(apiErrorHandler);
}

