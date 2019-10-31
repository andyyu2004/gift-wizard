import React, { useState } from 'react'
import { Sidebar } from '../components';
import usericon from '../images/user_icon.svg';
import Connections from './Connections';
import Settings from './Settings';
import PersonalProfile from './PersonalProfile';
import { Friend } from '../types';
import { getRandom } from '../util/array';
import { fakeusers } from '../mockdata/mockpeople';

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

/** View for editing one's own profile */
const Profile = props => {
  
  /** Map from Subview => Component; Used for conditional rendering */
  const viewMap = {
    [Subview.PersonalProfile]: <PersonalProfile />,
    [Subview.Interest]: null,
    [Subview.Connections]: <Connections friends={fakeFriends} />,
    [Subview.Wishlist]: null,
    [Subview.Settings]: <Settings />,
  };

  const [view, setView] = useState(Subview.PersonalProfile);
  const entries: [string, () => void][] = Object.values(Subview).map(subview => [subview, () => setView(subview)]);
  
  return (
    <div className="flex-container">
      <Sidebar 
        img={usericon}
        text="username"
        entries={entries} />
        <main>
          {viewMap[view]}
        </main>
    </div>
  );
};

export default Profile;


