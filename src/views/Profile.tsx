import React, { useState, ReactElement } from 'react'
import { Sidebar, Wishlist } from '../components';
import usericon from '../images/fake_user_profile.jpeg';
import Connections from './Connections';
import Settings from './Settings';
import PersonalProfile from './PersonalProfile';
import { Friend } from '../types';
import { getRandom } from '../util/array';
import { fakeusers, eilish } from '../mockdata/mockpeople';
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
    relationship: "Cousin",
  }, 
  {
    userid: getRandom(fakeusers).userid,
    relationship: "Classmate",
  },
  {
    userid: getRandom(fakeusers).userid,
    relationship: "Friend",
  },
];

type PropType = RouteComponentProps & { "*"?: string };

/** View for editing one's own profile */
const Profile: React.FC<PropType> = props => {

  /** Takes the wildcard parameter of the url as default view (otherwise empty) */
  const subview: string = props["*"] || Subview.PersonalProfile; 

  /** Map from Subview -> Component; Used for conditional rendering */
  const viewMap: { [key: string]: ReactElement } = {
    [Subview.PersonalProfile]: <PersonalProfile user={eilish} />,
    [Subview.Interest]: <h5>Area of interest</h5>,
    [Subview.Connections]: <Connections friends={fakeFriends} />,
    [Subview.Wishlist]: <Wishlist user={eilish} />,
    [Subview.Settings]: <Settings />,
  };

  const [view, setView] = useState(subview);

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


