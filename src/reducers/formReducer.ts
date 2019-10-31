import { FormRepr } from "../components/QEdit";
import { Action } from "../actions";

export type FormState = { [key: string]: FormRepr[] };


const initialFormState: FormState = {
    "Some mock 'saved' form template": JSON.parse('[{"kind":"MCR","id":"edf63b8b-2366-483d-bb89-b6a4a448ed6c","question":"Choose your fav from the following","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Option W",false,"18e3a8ff-3cdc-4e04-886d-d9d8f82e0e19"],["Option X",false,"310e1411-ccb4-4ac0-aceb-da27c54dbea8"],["Option Y",false,"c46a6506-abeb-42d1-939e-f88099d07efa"],["Option Z",false,"48d02cfa-ff1b-4d9d-bb9d-7773c38ab60c"]]},{"kind":"MCR","id":"1123e20e-e8cd-4ccb-81d3-af945a02a741","question":"Select all that you like","defaultQuestion":"Write Your Checkbox Question Here","mutex":false,"options":[["Option W",false,"d5eb7909-a9ed-4269-9cba-b943a2a5f642"],["Option X",false,"667fd889-de51-49b6-a518-f86aa82021fd"],["Option Y",false,"81af8bf4-631b-40d9-ad87-c120f8c62f1b"],["Option Z",false,"ae187a5d-56e9-44c1-b446-7d8eb22adb90"]]},{"kind":"RTR","id":"3afc874c-9218-47dd-954c-1ef3e7e63720","question":"What do you think of this?","defaultQuestion":"Write Your Rating Question Here","rating":0},{"kind":"RNKR","id":"37163ef9-dfef-46fb-af97-770cef5ad74c","question":"Order the following in order of most favourable to least","defaultQuestion":"Write Your Rank Answer Question Here","options":[["Rank Option A","a462ec10-cd29-499d-b1e3-abc9dc615319"],["Rank Option B","39275240-5c8a-4401-8bac-bd6f9683f01b"],["Rank Option C","72ce57eb-ba64-4020-ad9c-38b1eeb10a43"],["Rank Option D","b3984768-9732-4658-9ad6-6fc38c162197"]]},{"kind":"SAR","id":"c690011d-c926-4608-84d9-4ad4cc12f62e","question":"Do you like this?","defaultQuestion":"Write Your Short Answer Question Here","answer":""}]'),    
    "Some other random 'saved' form": JSON.parse('[{"kind":"MCR","id":"fa93034a-52b0-4966-ad29-edebd027830d","question":"What\'s 2+2?","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["10",false,"46b587fe-268e-4f8c-b799-812a73147b61"],["Option X",false,"e2943d72-4b17-4b2f-9be9-8c9988c3d8fa"],["Option Y",false,"58e9a62a-18b1-4c51-93f6-4d5ea493341e"],["Option Z",false,"1f1d492e-3661-4a09-ab00-729e090d151f"]]},{"kind":"MCR","id":"2c501823-600b-4b14-8bab-03766816f645","question":"Choose the best option","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Option W",false,"8a4cfc74-e900-4ade-a715-8e901904b276"],["Option X",false,"c9d3ffd5-5302-4d73-af45-4d581610d3a6"],["Option Y",false,"7133e41c-6cd1-46db-a27d-a8f222420a46"],["Option Z",false,"e47fe87c-9b99-4281-890e-375e7f36256d"]]}]'),
};

const formReducer = (state: FormState = initialFormState, action: Action) => {
    switch (action.type) {
        case "SAVE_FORM": {
            const { label, form } = action;
            return {
                ...state,
                [label]: form,
            };
        }
        default: return state;
    }
}

export default formReducer;