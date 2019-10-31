import { navigate, RouteComponentProps } from '@reach/router';
import React from 'react';
import { Cell, CellRow } from '../components';
import connectionsIcon from '../images/connections_btn1.png';
import createNewIcon from '../images/create_new_icon.png';
import areaOfInterestIcon from '../images/hobby_icon.png';
import template4icon from '../images/more_features_icon.png';
import moreIcon from '../images/more_options_icon.png';
import openFromExistingIcon from '../images/open_icon.png';
import template1icon from '../images/template1.png';
import template2icon from '../images/template2.png';
import template3icon from '../images/template4.png';
import wishListIcon from '../images/wishlist_icon2.png';
import settingsIcon from '../images/settings_icon.svg';
import { qtemplateone } from '../mockdata/templates';
import { FormRepr } from '../components/QEdit';

const Home: React.FC<RouteComponentProps> = props => {

  const navigateWithDefaultTemplate = (formLabel: string, starterForm: FormRepr[]) => 
    navigate("create", { 
      state: { 
        formLabel, 
        starterForm 
      }
    });

  return (
    <main>
      <CellRow 
        title="Looking for a gift for him/her?"
        subtitle="By sending him/her an anonymous questionnaire, get the best 'hints'!">
        <Cell image={createNewIcon} text="Create New" onClick={() => navigate("/create")} />
        <Cell image={openFromExistingIcon} text="Open Existing" onClick={() => navigate("/open")} />
        <Cell image={template1icon} text="template 1" onClick={() => navigateWithDefaultTemplate("Template 1", qtemplateone)} />
        <Cell image={template2icon} text="template xxx" />
        <Cell image={template3icon} text="template xxx" />
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