import { FormRepr, Questionnaire, User, UserType } from "shared/types";
import socketio from 'socket.io-client';
import { DeleteQTemplateAction, SaveQuestionnaireAction, SetUserAction, UpdateUserAction, UpdateUserTypeAction } from ".";
import { AddFormAction, AddOptionAction, RemoveFormAction, RemoveOptionAction, ReorderRankAction, SetCheckboxStatusAction, SetQuestionAction, SetShortAnswerAction, UpdateOptionAction, UpdateRatingAction } from "../types/FormActions";

/** Redux action creators */
export const updateUserType: (userType: UserType) => UpdateUserTypeAction = userType => ({
    type: "UPDATE_USER_TYPE",
    userType,
});

export const setUser: (user: User) => SetUserAction = user => {
    const socket = socketio('/', { query: `userid=${user._id}`});
    return {
        type: "SET_USER",
        user,
        socket,
    };
};

export const updateUser: (iser: User) => UpdateUserAction = user => ({
    type: "UPDATE_USER",
    user,
});

export const saveQuestionnaire: (questionnaire: Questionnaire) => SaveQuestionnaireAction = questionnaire => ({
    type: "SAVE_FORM",
    questionnaire,
});

export const deleteTemplate: (templateLabel: string) => DeleteQTemplateAction = templateLabel => ({
    type: "DELETE_TEMPLATE",
    templateLabel,
});

/** Form Action Creaters */
export const addForm: (form: FormRepr) => AddFormAction = form => ({
    type: "ADD_FORM", 
    form,
    formId: form.id,
});

export const removeForm: (formId: string) => RemoveFormAction = formId => ({
    type: "REMOVE_FORM",
    formId,
});

export const setShortAnswer: (answer: string, form: string) => SetShortAnswerAction = (answer, formId) => ({
    type: "SET_SHORT_ANSWER",
    formId,
    answer,
});

export const setQuestion: (question: string, form: string) => SetQuestionAction = (question, formId) => ({
    type: "SET_QUESTION",
    formId,
    question,
});

export const setCheckboxStatus: (index: number, status: boolean, form: string) => SetCheckboxStatusAction = (index, status, formId) => ({
    type: "SET_CHECK_BOX_STATUS",
    index,
    status,
    formId,
});

export const updateOption: (option: string, index: number, form: string) => UpdateOptionAction = (newOption, index, formId) => ({
    type: "UPDATE_OPTION",
    newOption,
    index,
    formId,
});

export const updateRating: (rating: number, form: string) => UpdateRatingAction = (rating, formId) => ({
    type: "UPDATE_RATING",
    formId,
    rating,
});

export const reorderRank: (source: number, dest: number, formId: string) => ReorderRankAction = (sourceIndex, destIndex, formId) => ({
    type: "REORDER_RANK",
    sourceIndex,
    destIndex,
    formId,
});

export function addOption(elem: any, formId: string): AddOptionAction {
    return {
        type: "ADD_OPTION",
        elem,
        formId,
    };
}

export const removeOption: (index: number, formId: string) => RemoveOptionAction = (index, formId) => ({
    type: "REMOVE_OPTION",
    index,
    formId,
});

