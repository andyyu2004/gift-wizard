import { navigate, RouteComponentProps } from '@reach/router';
import React from 'react';
import { Cell, CellRow } from '../components';
import connectionsIcon from '../images/connections_btn1.png';
import createNewIcon from '../images/create_new_icon.png';
import areaOfInterestIcon from '../images/hobby_icon.png';
import template4icon from '../images/more_features_icon.png';
import moreIcon from '../images/more_options_icon.png';
import openFromExistingIcon from '../images/open_icon.png';
import settingsIcon from '../images/settings_icon.svg';
import template1icon from '../images/template1.png';
import template2icon from '../images/template2.png';
import template3icon from '../images/template4.png';
import wishListIcon from '../images/wishlist_icon2.png';
import { Questionnaire } from "../types/FormTypes";
import { useSelector } from 'react-redux';
import { AppState } from '../reducers';

const Home: React.FC<RouteComponentProps> = props => {

  /** Navigate to the questionnaire edit page with the questionnaire set to the parameter of this function */
  const navigateWithDefaultLoadedQuestionnaire = (questionnaire: Questionnaire) => 
    navigate("create", { 
      state: { 
        questionnaire
      },
    });
  
  /** Navigate to the SavedTemplates page with the templates set to this parameter */
  const navigateWithTemplateSet = (templates: { [key: string]: Questionnaire }) =>
     navigate("open", {
       state: {
         templates
       }
     });

  const templates = useSelector<AppState, { [key: string]: Questionnaire }>(state => state.forms.templates);
  const userforms = useSelector<AppState, { [key: string]: Questionnaire }>(state => state.forms.user);

  return (
    <main>
      <CellRow 
        title="Looking for a gift for him/her?"
        subtitle="By sending him/her an anonymous questionnaire, get the best 'hints'!">
        <Cell image={createNewIcon} text="Create New" onClick={() => navigate("/create")} />
        <Cell image={openFromExistingIcon} text="Open Existing" onClick={() => navigateWithTemplateSet(userforms)} />
        <Cell image={template1icon} text="Template 1" onClick={() => navigateWithDefaultLoadedQuestionnaire(templates["Lipstick Template"])} />
        <Cell image={template2icon} text="Template 2" onClick={() => navigateWithDefaultLoadedQuestionnaire(templates["Template Questionnaire"])} />
        <Cell image={template3icon} text="All Templates" onClick={() => navigateWithTemplateSet(templates)} />
        <Cell image={template4icon} text="Browse more..." />
      </CellRow>
      <CellRow 
        title="Build up your profile"
        subtitle="To help out your family/friends picking a gift for you!">
        <Cell icon="areaOfInterest" image={areaOfInterestIcon} text="Area of Interest" onClick={() => navigate("/profile/Areas of Interest")} />
        <Cell icon="wishlist" image={wishListIcon} text="Wish List" onClick={() => navigate("/profile/Wish List")} />
        <Cell icon="connection" image={connectionsIcon} text="Connections" onClick={() => navigate("/profile/Connections")} />
        <Cell text="Settings" image={settingsIcon} icon="settings" onClick={() => navigate("profile/Settings")} />
        <Cell icon="moreOption" image={moreIcon} text="more" />
      </CellRow>
    </main>
  )
};

export default Home;