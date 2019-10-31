import { Action } from "../actions";
import { Questionnaire } from "../types/FormTypes";

export type FormState = { [key: string]: Questionnaire };


const initialFormState: FormState = {
    "werwerwer": JSON.parse('{"label":"werwerwer","forms":[{"kind":"MCR","id":"7386545b-70f6-4a82-ba3a-f4b3203dbe90","question":"werwerwer09","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Option W",false,"745c85a6-f790-45e8-ac96-380f255f99ee"],["Option X",false,"cf405b28-bd37-4a76-a9a8-ca6b4e5c47f6"],["Option Y",false,"397293d3-0cd4-404e-a846-40f1d3b550d6"],["Option Z",false,"70308f26-3fe2-4f1f-b565-e8dd11a6fcaa"]]},{"kind":"MCR","id":"365d350e-514e-4ea9-859b-1e3a6ffa25de","question":"werwer","defaultQuestion":"Write Your Checkbox Question Here","mutex":false,"options":[["Option W",false,"0249a34b-ae66-4b2b-80aa-cb8aa102df63"],["Option X",false,"dd095457-8f80-459d-9ce9-6fde428ebbb5"],["Option Y",false,"a48e05f0-0ec7-4b29-87ae-b114620c009c"],["Option Z",false,"47aae6d8-4ac4-48e0-86f3-2f4a3e5aa52a"]]},{"kind":"RTR","id":"43c57076-69c7-40df-af0d-1be841df19c3","question":"werwer","defaultQuestion":"Write Your Rating Question Here","rating":0}], "background": "grey" }'),
    "another werwer": JSON.parse('{"label":"another werwer","forms":[{"kind":"MCR","id":"7386545b-70f6-4a82-ba3a-f4b3203dbe90","question":"dfgfg","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Option W",false,"745c85a6-f790-45e8-ac96-380f255f99ee"],["Option X",false,"cf405b28-bd37-4a76-a9a8-ca6b4e5c    47f6"],["Option Y",false,"397293d3-0cd4-404e-a846-40f1d3b550d6"],["Option Z",false,"70308f26-3fe2-4f1f-b565-e8dd11a6fcaa"]]},{"kind":"MCR","id":"365d350e-514e-4ea9-859b-1e3a6ffa25de","question":"werwer","defaultQuestion":"Write Your Checkbox Question Here","mutex":false,"options":[["Option W",false,"0249a34b-ae66-4b2b-80aa-cb8aa102df63"],["Option X",false,"dd095457-8f80-459d-9ce9-6fde428ebbb5"],["Option Y",false,"a48e05f0-0ec7-4b29-87ae-b114620c009c"],["Option Z",false,"47aae6d8-4ac4-48e0-86f3-2f4a3e5aa52a"]]},{"kind":"RTR","id":"43c57076-69c7-40df-af0d-1be841df19c3","question":"werwer","defaultQuestion":"Write Your Rating Question Here","rating":0}], "background": "blue" }')
};

const formReducer = (state: FormState = initialFormState, action: Action) => {
    switch (action.type) {
        case "SAVE_FORM": {
            const { questionnaire: { label }, questionnaire } = action;
            return {
                ...state,
                [label]: questionnaire, /** Using questionnare label as the key */
            };
        }
        default: return state;
    }
}

export default formReducer;