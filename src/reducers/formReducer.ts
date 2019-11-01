import { Action } from "../actions";
import { Questionnaire } from "../types/FormTypes";

export type FormState = { 
    user: { [key: string]: Questionnaire },
    templates: { [key: string]: Questionnaire },
};


/** Some random form templates to retrieve instead of fetching from server */
const initialFormState: FormState = {
    user: {
        "werwerwer": JSON.parse('{"label":"werwerwer","forms":[{"kind":"MCR","id":"7386545b-70f6-4a82-ba3a-f4b3203dbe90","question":"werwerwer09","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Option W",false,"745c85a6-f790-45e8-ac96-380f255f99ee"],["Option X",false,"cf405b28-bd37-4a76-a9a8-ca6b4e5c47f6"],["Option Y",false,"397293d3-0cd4-404e-a846-40f1d3b550d6"],["Option Z",false,"70308f26-3fe2-4f1f-b565-e8dd11a6fcaa"]]},{"kind":"MCR","id":"365d350e-514e-4ea9-859b-1e3a6ffa25de","question":"werwer","defaultQuestion":"Write Your Checkbox Question Here","mutex":false,"options":[["Option W",false,"0249a34b-ae66-4b2b-80aa-cb8aa102df63"],["Option X",false,"dd095457-8f80-459d-9ce9-6fde428ebbb5"],["Option Y",false,"a48e05f0-0ec7-4b29-87ae-b114620c009c"],["Option Z",false,"47aae6d8-4ac4-48e0-86f3-2f4a3e5aa52a"]]},{"kind":"RTR","id":"43c57076-69c7-40df-af0d-1be841df19c3","question":"werwer","defaultQuestion":"Write Your Rating Question Here","rating":0}], "background": "grey" }'),
        "another werwer": JSON.parse('{"label":"another werwer","forms":[{"kind":"MCR","id":"7386545b-70f6-4a82-ba3a-f4b3203dbe90","question":"dfgfg","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Option W",false,"745c85a6-f790-45e8-ac96-380f255f99ee"],["Option X",false,"cf405b28-bd37-4a76-a9a8-ca6b4e5c    47f6"],["Option Y",false,"397293d3-0cd4-404e-a846-40f1d3b550d6"],["Option Z",false,"70308f26-3fe2-4f1f-b565-e8dd11a6fcaa"]]},{"kind":"MCR","id":"365d350e-514e-4ea9-859b-1e3a6ffa25de","question":"werwer","defaultQuestion":"Write Your Checkbox Question Here","mutex":false,"options":[["Option W",false,"0249a34b-ae66-4b2b-80aa-cb8aa102df63"],["Option X",false,"dd095457-8f80-459d-9ce9-6fde428ebbb5"],["Option Y",false,"a48e05f0-0ec7-4b29-87ae-b114620c009c"],["Option Z",false,"47aae6d8-4ac4-48e0-86f3-2f4a3e5aa52a"]]},{"kind":"RTR","id":"43c57076-69c7-40df-af0d-1be841df19c3","question":"werwer","defaultQuestion":"Write Your Rating Question Here","rating":0}], "background": "blue" }')
    },
    templates: {
        "template 1": JSON.parse('{"label":"another werwer","forms":[{"kind":"MCR","id":"7386545b-70f6-4a82-ba3a-f4b3203dbe90","question":"dfgfg","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Option W",false,"745c85a6-f790-45e8-ac96-380f255f99ee"],["Option X",false,"cf405b28-bd37-4a76-a9a8-ca6b4e5c    47f6"],["Option Y",false,"397293d3-0cd4-404e-a846-40f1d3b550d6"],["Option Z",false,"70308f26-3fe2-4f1f-b565-e8dd11a6fcaa"]]},{"kind":"MCR","id":"365d350e-514e-4ea9-859b-1e3a6ffa25de","question":"werwer","defaultQuestion":"Write Your Checkbox Question Here","mutex":false,"options":[["Option W",false,"0249a34b-ae66-4b2b-80aa-cb8aa102df63"],["Option X",false,"dd095457-8f80-459d-9ce9-6fde428ebbb5"],["Option Y",false,"a48e05f0-0ec7-4b29-87ae-b114620c009c"],["Option Z",false,"47aae6d8-4ac4-48e0-86f3-2f4a3e5aa52a"]]},{"kind":"RTR","id":"43c57076-69c7-40df-af0d-1be841df19c3","question":"werwer","defaultQuestion":"Write Your Rating Question Here","rating":0}], "background": "blue" }'),
        "template 2": JSON.parse('{ "label": "template1", "forms": [{"kind":"MCR","id":"3594bbd0-eb61-4e14-b077-ac7d5810ea81","question":"Template1","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Option W",false,"4d173840-977f-4475-8c61-48c478749a17"],["Option X",false,"c2dc1895-22ba-4666-ad5e-85ad50d8a8f3"],["Option Y",false,"433a8f7a-b7fe-439f-a1cf-f75b62b56a34"],["Option Z",false,"bda976e4-0a69-4048-816f-b663f3d1d2c7"],["New Option",false,"c0c260a5-c294-473d-8608-da9e7b28264d"],["New Option",false,"39256deb-59e7-4723-b93b-c2daf2acf0e5"],["New Option",false,"2d9aea01-b262-4137-b157-a442c6d659f9"]]},{"kind":"MCR","id":"290c2c48-ff5c-4c8a-9abe-ef69d6639a40","question":"Template 2","defaultQuestion":"Write Your Checkbox Question Here","mutex":false,"options":[["Option W",false,"f7023590-1e68-40b1-995a-7e381a9fa951"],["Option X",false,"e498adc4-1bab-4ad3-89a5-9f506268ce6c"],["Option Y",false,"e56394a6-75d9-4107-86af-0e7a3346e6d0"],["Option Z",false,"7a7e50e1-c0d9-456b-9b64-de910283fc80"]]},{"kind":"RTR","id":"13966945-2db8-4336-bc42-3a56a4eaccf8","question":"sdfsdf","defaultQuestion":"Write Your Rating Question Here","rating":0}] }'),
        "Game Template": JSON.parse('{"label":"","forms":[{"kind":"MCR","id":"26e7ac2d-ffc5-4212-867a-7027bb98503f","question":"Rank the following video games!","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Tekken 7",false,"d3d27941-8754-4444-bc1f-df33d8932745"],["Call of Duty: Black Ops 4",false,"203eb2f8-a162-4e1b-b5a7-7039156cf05f"],["Assassins Creed Odyssey",false,"c655e9ce-b4cd-4c81-966b-335950275822"],["God of War",false,"359ec656-324c-49c7-b43a-f82e2a3a758a"]]},{"kind":"SAR","id":"30102c54-6e9b-476c-9e09-d0e37fbd3058","question":"Any further thoughts?","defaultQuestion":"Write Your Short Answer Question Here","answer":""},{"kind":"RTR","id":"aad3836b-4454-4b23-a875-48d378b6660d","question":"Rate this website!","defaultQuestion":"Write Your Rating Question Here","rating":0}],"background":"/static/media/pattern1.1e1a8f9a.jpg"}')
    },
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