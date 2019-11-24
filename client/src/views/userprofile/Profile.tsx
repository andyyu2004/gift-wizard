import { RouteComponentProps } from '@reach/router';
import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { User } from 'shared/types';
import { Sidebar } from '../../components';
import { AreaOfInterest, Wishlist } from '../../components/users';
import { withProtection } from '../../components/hoc';
import { AppState } from '../../reducers';
import Connections from './Connections';
import PersonalProfile from './PersonalProfile';
import Settings from './Settings';

/** Enumeration of the subviews of the page */ 
enum Subview {
  PersonalProfile = "Personal Profile",
  Interest        = "Areas of Interest",
  Connections     = "Connections",
  Wishlist        = "Wish List",
  Settings        = "Settings",
}

type PropType = RouteComponentProps & { "*"?: string };

/** View for editing one's own profile */
const Profile: React.FC<PropType> = props => {

  const user = useSelector<AppState, User>(state => state.user.user!);

  /** Takes the wildcard parameter of the url as default view (otherwise empty) */
  const subview: string = props["*"] || Subview.PersonalProfile; 
  const [view, setView] = useState(subview);

  /** Map from Subview -> Component; Used for conditional rendering */
  const viewMap: { [key: string]: ReactElement } = {
    [Subview.PersonalProfile]: <PersonalProfile user={user} />,
    [Subview.Interest]: <AreaOfInterest interests={user.interests || []} />,
    [Subview.Connections]: <Connections friendIds={user.friends} />,
    [Subview.Wishlist]: <Wishlist user={user} />,
    [Subview.Settings]: <Settings />,
  };

  const entries: [string, () => void][] = Object.values(Subview).map(subview => [subview, () => setView(subview)]);
  
  return (
    <div className="flex-container" style={{ backgroundColor: 'white' }}>
      <Sidebar
        img={user.picture}
        text={user.username}
        entries={entries} />
        <main>
          {viewMap[view]}
        </main>
    </div>
  );
};

export default withProtection(Profile);


