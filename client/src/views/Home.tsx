import { navigate, RouteComponentProps } from '@reach/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { navigateWithDefaultLoadedQuestionnaire, navigateWithTemplateSet } from '../actions/navigation';
import { Cell, CellRow } from '../components';
import connectionsIcon from '../images/connections_btn1.png';
import createNewIcon from '../images/create_new_icon.png';
import areaOfInterestIcon from '../images/hobby_icon.png';
import openFromExistingIcon from '../images/open_icon.png';
import settingsIcon from '../images/settings_icon.svg';
import template1icon from '../images/template1.png';
import template2icon from '../images/template2.png';
import template3icon from '../images/template4.png';
import wishListIcon from '../images/wishlist_icon2.png';
import { AppState } from '../reducers';
import { Questionnaire, User } from "shared/types";
import API from '../api';
import { toast } from 'react-toastify';
import { loadReceived } from '../api/questionnaire';

const Home: React.FC<RouteComponentProps> = props => {

  const templates = useSelector<AppState, { [key: string]: Questionnaire }>(state => state.forms.templates);
  const userforms = useSelector<AppState, { [key: string]: Questionnaire }>(state => state.forms.user);
  /** Can assert non-null as you cannot visit this page without being logged in */
  const user = useSelector<AppState, User>(state => state.user.user!);

  /** Event handler for the 'open existing' icon; Opens user's personal saved templates */
  const handleOpenUserTemplates = async () => {
    if (!user) return navigate('/login');
    (await API.loadUserQuestionnaires(user._id))
      .map(qs => navigateWithTemplateSet("Saved", qs))
      .mapLeft(toast.error);
  };

  const handleOpenAllTemplates = async () => {
    if (!user) return navigate('/login');
    (await API.loadAllQuestionnaires())
      .map(qs => navigateWithTemplateSet("Templates", qs))
      .mapLeft(toast.error);
  };

  return (
    <main>
      <CellRow
        title="Looking for a gift for him/her?"
        subtitle="By sending him/her an anonymous questionnaire, get the best 'hints'!">
        <Cell image={createNewIcon} text="Create New" onClick={() => navigate("/create")} />
        <Cell image={openFromExistingIcon} text="Open Existing" onClick={handleOpenUserTemplates} />
        <Cell image={template1icon} text="Mail" onClick={() => navigate('mail')} />
        {/* <Cell image={template2icon} text="Template 2" onClick={() => navigateWithDefaultLoadedQuestionnaire(templates["Template Questionnaire"])} /> */}
        <Cell image={connectionsIcon} text="People" onClick={() => navigate('/people')} />
        <Cell image={template3icon} text="All Templates" onClick={handleOpenAllTemplates} />
      </CellRow>
      <CellRow 
        title="Build up your profile"
        subtitle="To help out your family/friends picking a gift for you!">
        <Cell icon="areaOfInterest" image={areaOfInterestIcon} text="Area of Interest" onClick={() => navigate("/profile/Areas of Interest")} />
        <Cell icon="wishlist" image={wishListIcon} text="Wish List" onClick={() => navigate("/profile/Wish List")} />
        <Cell icon="connection" image={connectionsIcon} text="Connections" onClick={() => navigate("/profile/Connections")} />
        <Cell text="Settings" image={settingsIcon} icon="settings" onClick={() => navigate("profile/Settings")} />        
      </CellRow>
    </main>
  )
};

export default Home;