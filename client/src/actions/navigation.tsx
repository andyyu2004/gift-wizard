import { Questionnaire } from "shared/types";
import { navigate } from "@reach/router";

  /** Navigate to the questionnaire edit page with the questionnaire set to the parameter of this function */
  export const navigateWithDefaultLoadedQuestionnaire = (questionnaire: Questionnaire) => 
    navigate("create", { 
      state: { 
        questionnaire
      },
    });
  
  /** Navigate to the SavedTemplates page with the templates set to this parameter */
  export const navigateWithTemplateSet = (title: string, templates: { [key: string]: Questionnaire }) =>
     navigate("open", {
       state: {
         templates,
         title,
       }
     });