
import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router';
import { Header, CellRow, Cell} from '../components';
import createNewIcon from '../images/create_new_icon.png';
import openFromExistingIcon from '../images/open_icon.png';
import template1 from '../images/template1.png';
import template2 from '../images/template2.png';
import template3 from '../images/template4.png';
import template4 from '../images/more_features_icon.png';
import areaOfInterestIcon from '../images/hobby_icon.png';
import wishListIcon from '../images/wishlist_icon2.png';
import connectionsIcon from '../images/connections_btn1.png';
import moreIcon from '../images/more_options_icon.png';

const Home: React.FC<RouteComponentProps> = props => {
  return (
    <main>
      <CellRow 
        title="Looking for a gift for him/her?"
        subtitle="By sending him/her an anonymous questionnaire, get the best 'hints'!">
        <Cell image={createNewIcon} text="Create New" onClick={() => navigate("/create")}/>
        <Cell image={openFromExistingIcon} text="Open Existing"/>
        <Cell image={template1} text="template xxx"/>
        <Cell image={template2} text="template xxx"/>
        <Cell image={template3} text="template xxx"/>
        <Cell image={template4} text="Browse more..."/>
      </CellRow>
      <CellRow 
        title="Build up your profile"
        subtitle="To help out your family/friends picking a gift for you!">
        <Cell icon="areaOfInterest" image={areaOfInterestIcon} text="Area of Interest"/>
        <Cell icon="wishlist" image={wishListIcon} text="Wish List"/>
        <Cell icon="connection" image={connectionsIcon} text="Connections"/>
        <Cell icon="moreOption" image={moreIcon} text="more"/>
      </CellRow>
    </main>
  )
};

export default Home;