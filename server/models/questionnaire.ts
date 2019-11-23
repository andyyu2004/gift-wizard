import { model, Schema, Document } from 'mongoose';
import { Questionnaire } from 'shared/types';

// const Form = new Schema({ any: Schema.Types.Mixed });

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


