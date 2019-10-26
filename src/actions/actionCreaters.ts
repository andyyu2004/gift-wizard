import { UserType } from "../types";
import { UpdateUserTypeAction } from ".";
import { FormRepr } from "../components/QEdit";
import { AddFormAction, SetShortAnswerAction, SetShortAnswerQuestionAction, SetCheckboxStatusAction, UpdateCheckboxOptionAction } from "../containers/QEditContainer";

/** Redux action creators */
export const updateUserType: (userType: UserType) => UpdateUserTypeAction = userType => ({
    type: "UPDATE_USER_TYPE",
    payload: { userType }
});



/** Form Action Creaters */
export const addForm: (form: FormRepr) => AddFormAction = form => ({
    type: "ADD_FORM", 
    form,
})

export const setShortAnswer: (answer: string, form: FormRepr) => SetShortAnswerAction = (answer, form) => ({
    type: "SET_SHORT_ANSWER",
    form,
    answer,
});


export const setShortAnswerQuestion: (question: string, form: FormRepr) => SetShortAnswerQuestionAction = (question, form) => ({
    type: "SET_SHORT_ANSWER_QUESTION",
    form,
    question,
});

export const setCheckboxStatus: (option: string, status: boolean, form: FormRepr) => SetCheckboxStatusAction = (option, status, form) => ({
    type: "SET_CHECK_BOX_STATUS",
    option,
    status,
    form,
});


export const updateCheckboxOption: (option: string, index: number, form: FormRepr) => UpdateCheckboxOptionAction = (newOption, index, form) => ({
    type: "UPDATE_CHECK_BOX_OPTION",
    newOption,
    index,
    form,
});