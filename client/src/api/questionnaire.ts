import { Questionnaire, Left, Right, Either, QMail } from "shared/types";
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

export async function sendQuestionnaire(questionnaire: Questionnaire, receiverid: string): Promise<Either<string, QMail>> {
    return axios.post(`/api/protected/questionnaires/${receiverid}`, { questionnaire })
        .then<any>(res => new Right(res.data.questionnaire))
        .catch(apiErrorHandler);
}

export async function loadReceived(): Promise<Either<string, QMail[]>> {
    return axios.get(`/api/protected/questionnaires/received`)
        .then<any>(res => new Right(res.data.mail))
        .catch(apiErrorHandler);
}

export async function loadSentMail(): Promise<Either<string, QMail[]>> {
    return axios.get(`/api/protected/questionnaires/sent`)
        .then<any>(res => new Right(res.data.mail))
        .catch(apiErrorHandler);
}


