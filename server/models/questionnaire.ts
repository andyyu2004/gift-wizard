import { model, Schema, Document } from 'mongoose';
import { Questionnaire, QMail } from 'shared/types';

// const Form = new Schema({ any: Schema.Types.Mixed });

const QuestionnaireSchema = new Schema({
    label: {
        type: String, /* Name of the questionnaire */
        required: true,
    },
    background: String, /* Path of background image */
    forms: {
        required: true,
        type: Schema.Types.Mixed, /* List of forms, which each have different structure so represented as any Schema */
    },
});

export type TQuestionnaire = Document & Questionnaire;

export const QuestionnaireModel = model<TQuestionnaire>("Questionnaire", new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    label: {
        type: String, /* Name of the questionnaire */
        required: true,
    },
    background: String, /* Path of background image */
    forms: {
        required: true,
        type: Schema.Types.Mixed, /* List of forms, which each have different structure so represented as any Schema */
    },
}));

/** Differentiate between private user saved repo vs sitewide questionnaire repository */
export type TQRepo = Document & Questionnaire;

export const QRepoModel = model<TQRepo>("RepoQuestionnaire", QuestionnaireSchema);


export type TQMail = Document & QMail;
/** This database design is bit of a tragedy atm lol, but there is no time -_- */
/** Questionnaires that are sent to and from */
export const QMailModel = model<TQMail>("QMail", new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    questionnaire: {
        type: QuestionnaireSchema,
        required: true,
    }
}));

