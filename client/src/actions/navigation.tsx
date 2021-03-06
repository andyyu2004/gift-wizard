import { Questionnaire, QMail } from "shared/types";
import { navigate } from "@reach/router";

  /** Navigate to the questionnaire edit page with the questionnaire set to the parameter of this function */
  export const navigateWithDefaultLoadedQuestionnaire = (questionnaire: Questionnaire) => {
    navigate("/create", { 
      state: { 
        questionnaire
      },
    });
  };

  export const answerQuestionnaire = (qmail: QMail) => {
    navigate("/answer", { 
      state: { 
        qmail,
      },
    });
  };
  
  /** Navigate to the SavedTemplates page with the templates set to this parameter */
  export const navigateWithTemplateSet = (title: string, templates: Questionnaire[]) =>
     navigate("/open", {
       state: {
         templates,
         title,
       }
     });