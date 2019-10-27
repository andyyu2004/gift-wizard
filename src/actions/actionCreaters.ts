import { UserType } from "../types";
import { UpdateUserTypeAction } from ".";
import { FormRepr } from "../components/QEdit";
import { AddFormAction, SetShortAnswerAction, SetQuestionAction, SetCheckboxStatusAction, UpdateOptionAction, UpdateRatingAction, ReorderRankAction } from "../containers/QEditContainer";

/** Redux action creators */
export const updateUserType: (userType: UserType) => UpdateUserTypeAction = userType => ({
    type: "UPDATE_USER_TYPE",
    payload: { userType }
});



/** Form Action Creaters */
export const addForm: (form: FormRepr) => AddFormAction = form => ({
    type: "ADD_FORM", 
    form,
    formId: form.id,
})

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

export const setCheckboxStatus: (option: string, status: boolean, form: string) => SetCheckboxStatusAction = (option, status, formId) => ({
    type: "SET_CHECK_BOX_STATUS",
    option,
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


