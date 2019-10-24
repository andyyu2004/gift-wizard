import React, { useState } from 'react'
import { Sidebar } from '../components';
import usericon from '../images/user_icon.svg';

enum Subviews {
  PersonalProfile = "Personal Profile",
  Interest        = "Areas of Interest",
  Connections     = "Connections",
  Wishlist        = "Wish List",
  Settings        = "Settings",
}

const Profile = props => {
  
  const [view, setView] = useState(Subviews.PersonalProfile);
  const entries: [string, () => void][] = Object.values(Subviews).map(subview => [subview, () => setView(subview)]);

  return (
    <div className="flex-container">
      <Sidebar 
        img={usericon} 
        text="username"
        entries={entries} />
        <main>
          <h4>Current view: {view}</h4>
        </main>
    </div>
  );
};

export default Profile;

// Ugly
// const entries: [string, () => void][] = [
//   [Subviews.PersonalProfile, () => {}],
//   [Subviews.Interest, () => {}],
//   [Subviews.Connections, () => {}],
//   [Subviews.Wishlist, () => {}],
//   [Subviews.Settings, () => {}],
// ];