import { Action } from "../actions";
import { Questionnaire } from "shared/types";

export type FormState = { 
    user: { [key: string]: Questionnaire },
    templates: { [key: string]: Questionnaire },
};


/** Some random form templates to retrieve instead of fetching from server */
const initialFormState: FormState = {
    user: {
        "Random User Saved Template": JSON.parse('{"label":"Random User Saved Template","forms":[{"kind":"MCR","id":"7386545b-70f6-4a82-ba3a-f4b3203dbe90","question":"werwerwer09","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Option W",false,"745c85a6-f790-45e8-ac96-380f255f99ee"],["Option X",false,"cf405b28-bd37-4a76-a9a8-ca6b4e5c47f6"],["Option Y",false,"397293d3-0cd4-404e-a846-40f1d3b550d6"],["Option Z",false,"70308f26-3fe2-4f1f-b565-e8dd11a6fcaa"]]},{"kind":"MCR","id":"365d350e-514e-4ea9-859b-1e3a6ffa25de","question":"werwer","defaultQuestion":"Write Your Checkbox Question Here","mutex":false,"options":[["Option W",false,"0249a34b-ae66-4b2b-80aa-cb8aa102df63"],["Option X",false,"dd095457-8f80-459d-9ce9-6fde428ebbb5"],["Option Y",false,"a48e05f0-0ec7-4b29-87ae-b114620c009c"],["Option Z",false,"47aae6d8-4ac4-48e0-86f3-2f4a3e5aa52a"]]},{"kind":"RTR","id":"43c57076-69c7-40df-af0d-1be841df19c3","question":"werwer","defaultQuestion":"Write Your Rating Question Here","rating":0}], "background":"/static/media/pattern4.b16bc2a9.jpg" }'),
        "Another User Saved Template": JSON.parse('{"label":"Another User Saved Template","forms":[{"kind":"MCR","id":"7386545b-70f6-4a82-ba3a-f4b3203dbe90","question":"dfgfg","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Option W",false,"745c85a6-f790-45e8-ac96-380f255f99ee"],["Option X",false,"cf405b28-bd37-4a76-a9a8-ca6b4e5c    47f6"],["Option Y",false,"397293d3-0cd4-404e-a846-40f1d3b550d6"],["Option Z",false,"70308f26-3fe2-4f1f-b565-e8dd11a6fcaa"]]},{"kind":"MCR","id":"365d350e-514e-4ea9-859b-1e3a6ffa25de","question":"werwer","defaultQuestion":"Write Your Checkbox Question Here","mutex":false,"options":[["Option W",false,"0249a34b-ae66-4b2b-80aa-cb8aa102df63"],["Option X",false,"dd095457-8f80-459d-9ce9-6fde428ebbb5"],["Option Y",false,"a48e05f0-0ec7-4b29-87ae-b114620c009c"],["Option Z",false,"47aae6d8-4ac4-48e0-86f3-2f4a3e5aa52a"]]},{"kind":"RTR","id":"43c57076-69c7-40df-af0d-1be841df19c3","question":"werwer","defaultQuestion":"Write Your Rating Question Here","rating":0}], "background":"/static/media/pattern1.1e1a8f9a.jpg" }')
    },
    templates: {
        "Game Template": JSON.parse('{"label":"Game Template","forms":[{"kind":"MCR","id":"26e7ac2d-ffc5-4212-867a-7027bb98503f","question":"Rank the following video games!","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Tekken 7",false,"d3d27941-8754-4444-bc1f-df33d8932745"],["Call of Duty: Black Ops 4",false,"203eb2f8-a162-4e1b-b5a7-7039156cf05f"],["Assassins Creed Odyssey",false,"c655e9ce-b4cd-4c81-966b-335950275822"],["God of War",false,"359ec656-324c-49c7-b43a-f82e2a3a758a"]]},{"kind":"SAR","id":"30102c54-6e9b-476c-9e09-d0e37fbd3058","question":"Any further thoughts?","defaultQuestion":"Write Your Short Answer Question Here","answer":""},{"kind":"RTR","id":"aad3836b-4454-4b23-a875-48d378b6660d","question":"Rate this website!","defaultQuestion":"Write Your Rating Question Here","rating":0}],"background":"/static/media/pattern1.1e1a8f9a.jpg"}'),
        "Lipstick Template": JSON.parse('{"label":"Lipstick Template","forms":[{"kind":"MCR","id":"9266c746-614d-4cec-bb99-29ca8d389a2f","question":"What style do your want to try for your new lipstick?","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Sexy",false,"82abd79e-f13a-46e2-a564-c8db5dcdb20d"],["Girlish",false,"da2ce9ff-eb7a-416b-95f5-8814af5006ba"],["Queen",false,"3757605a-b2ba-43ce-84e3-963ee17f3f73"],["Gentle",false,"6a73d93e-0ed1-4145-8fd6-01d6eb435afa"]]},{"kind":"MCR","id":"9f255a52-76bb-477a-9b24-7d155b833293","question":"Pick the color schemes you like!","defaultQuestion":"Write Your Checkbox Question Here","mutex":false,"options":[["Orange",false,"f31d0e03-df2e-411e-83eb-2012256f211d"],["Red",false,"32243631-6304-406a-b3d8-4e3967d37236"],["Violet",false,"b3917a34-7840-4e5f-a834-89c7e94934d8"],["Pink",false,"b0537bff-8ae0-4d42-aa2e-06632b96cb9e"]]},{"kind":"RTR","id":"6c7b6dff-d156-485b-b2b6-2bdf5b34a835","question":"Lipstick texture! (0 stars for matte ~ 10 stars for sheer)","defaultQuestion":"Write Your Rating Question Here","rating":0},{"kind":"RNKR","id":"5c76ebb6-c044-4299-83b3-7af10bc4336e","question":"Your preference for lipstick brands!","defaultQuestion":"Write Your Rank Answer Question Here","options":[["Giorgio Armani","f9041641-fc7e-4bab-bce9-0fa2897acf98"],["Mac","fa999a60-8369-4a33-888a-854521ed0cd7"],["Chanel","0a08afde-b8f2-4573-aafb-72f2d075522b"],["TF","b01aac16-4d9b-465b-ad73-4557a9deb0e0"]]},{"kind":"SAR","id":"db1d80d2-dc1a-428a-80ed-8b4429286f8b","question":"Your wishlist for lipstick colors!","defaultQuestion":"Write Your Short Answer Question Here","answer":""}],"background":"/static/media/pattern4.b16bc2a9.jpg"}'),
        "Template Questionnaire": JSON.parse('{"label":"Template Questionnaire","forms":[{"kind":"MCR","id":"0dd0b88c-597b-45e6-816a-6ae5b5514846","question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","defaultQuestion":"Write Your Multichoice Question Here","mutex":true,"options":[["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",false,"38c41337-463a-4726-8b59-15ed0fec26ba"],["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",false,"5e0b73d8-cfdf-4956-9b90-35aa9570ba81"],["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",false,"d954f268-483f-4839-8858-67bcb1b62045"],["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",false,"75072461-c5d4-4661-9498-843f8bf91a50"]]},{"kind":"MCR","id":"aef3d2b7-5f63-4fc8-a763-34a22b2ef683","question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","defaultQuestion":"Write Your Checkbox Question Here","mutex":false,"options":[["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",false,"f37cc135-0807-469d-9f61-0261e4f0deee"],["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",false,"18081b71-4e56-484f-aa3c-969a64246b65"],["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",false,"9b3f5338-a40e-48db-b18f-d20d96b8d31e"],["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",false,"e1d9990f-a61b-4f1d-80ce-73338634dde3"]]},{"kind":"RTR","id":"b9340614-152d-4e63-95c5-50d01a9108a7","question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","defaultQuestion":"Write Your Rating Question Here","rating":8},{"kind":"RNKR","id":"c8405723-ab7d-4222-816e-e9e0bc1debb6","question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","defaultQuestion":"Write Your Rank Answer Question Here","options":[["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","4900055a-b438-40ba-af47-189d54307dcd"],["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","0c693bab-ab96-42b1-bc2f-f82fc03120f6"],["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","8bf3d4e4-0fb6-4d79-ae3e-7472b3961d64"],["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","456a8f57-7b3b-4707-9718-079b4ad422a8"]]},{"kind":"SAR","id":"ca85aa65-1fbe-4ce9-9ca5-b7b77ddcb080","question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","defaultQuestion":"Write Your Short Answer Question Here","answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. "},{"kind":"SAR","id":"350e006d-06a2-40b2-b8b2-556fafae8439","question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","defaultQuestion":"Write Your Short Answer Question Here","answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}],"background":"/static/media/pattern3.cfcfd91f.jpg"}'),
    },
};

const formReducer = (state: FormState = initialFormState, action: Action) => {
    switch (action.type) {
        case "SAVE_FORM": {
            const { questionnaire: { label }, questionnaire } = action;
            const newUserFormState = {
                ...state.user,
                [label]: questionnaire, /** Using questionnare label as the key */
            };
            return {
                ...state,
                user: newUserFormState
            };
        }

        case "DELETE_TEMPLATE": {
            const { templateLabel } = action;
            const newTemplates = { ...state.templates }
            delete newTemplates[templateLabel];
            return {
                ...state,
                templates: newTemplates,
            };
        }

        default: return state;
    }
};

export default formReducer;