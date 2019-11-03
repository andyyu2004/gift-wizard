import React, { useState } from 'react'
import { Sidebar } from '../components';
import usericon from '../images/fake_user_profile.jpeg';
import Connections from './Connections';
import Settings from './Settings';
import PersonalProfile from './PersonalProfile';
import { Friend } from '../types';
import { getRandom } from '../util/array';
import { fakeusers } from '../mockdata/mockpeople';
import { RouteComponentProps } from '@reach/router';

/** Enumeration of the subviews of the page */ 
enum Subview {
  PersonalProfile = "Personal Profile",
  Interest        = "Areas of Interest",
  Connections     = "Connections",
  Wishlist        = "Wish List",
  Settings        = "Settings",
}

/** Random selection of people from fakeusers */
const fakeFriends: Friend[] = [
  {
    userid: getRandom(fakeusers).userid,
    relationship: "Dad",
  }, 
  {
    userid: getRandom(fakeusers).userid,
    relationship: "Mom",
  },
  {
    userid: getRandom(fakeusers).userid,
    relationship: "Friend",
  },
];

type PropType = RouteComponentProps;

/** View for editing one's own profile */
const Profile: React.FC<PropType> = props => {

  /** Takes the wildcard parameter of the url (otherwise empty ) */
  const subview: string = props["*"]; 

  /** Map from Subview => Component; Used for conditional rendering */
  const viewMap = {
    [Subview.PersonalProfile]: <PersonalProfile />,
    [Subview.Interest]: <h5>Area of interest</h5>,
    [Subview.Connections]: <Connections friends={fakeFriends} />,
    [Subview.Wishlist]: <h5>Wish list</h5>,
    [Subview.Settings]: <Settings />,
  };

  const [view, setView] = useState(subview || Subview.PersonalProfile);

  const entries: [string, () => void][] = Object.values(Subview).map(subview => [subview, () => setView(subview)]);
  
  return (
    <div className="flex-container" style={{ backgroundColor: 'white' }}>
      <Sidebar
        img={usericon}
        text="Eilish_1031"
        entries={entries} />
        <main>
          {viewMap[view]}
        </main>
    </div>
  );
};

export default Profile;


