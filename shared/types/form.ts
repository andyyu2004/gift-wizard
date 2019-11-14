interface IForm {
    kind: string,
    id: string,
    question: string,
    defaultQuestion: string,
}

export enum QuestionType {
    MultiChoice = "Multiple Choice",
    Checkboxes  = "Checkboxes",
    Rank        = "Rank Options", /** Rank multiple options */
    ShortAnswer = "Short Answer",
    RateOption  = "Rate Option", /** Rate 1-10 for one single option */ 
    // TrueFalse   = "True / False", // Just use multichoice for this
}

export type Questionnaire = {
    label: string,
    forms: FormRepr[],
    background?: string,
};

export type FormRepr 
    = MultichoiceRepr 
    | ShortAnswerRepr
    | RankFormRepr
    | RateFormRepr;

export interface ShortAnswerRepr extends IForm {
    kind: "SAR",
    id: string,
    question: string,
    answer: string,
    defaultQuestion: string,
};

export interface MultichoiceRepr extends IForm {
    kind: "MCR",
    id: string,
    question: string,
    defaultQuestion: string,
    mutex: boolean, /** Mutually exclusive options? */
    options: [string, boolean, string][], /** (option, isChecked, id) triples; */
};

export interface RankFormRepr extends IForm {
    kind: "RNKR",
    id: string,
    question: string,
    defaultQuestion: string,
    options: [string, string][], /** (option, id) pairs. Rank is just the array order */
};

export interface RateFormRepr extends IForm {
    kind: "RTR",
    id: string,
    defaultQuestion: string,
    question: string, /** The object to rate */
    rating: number,
};


