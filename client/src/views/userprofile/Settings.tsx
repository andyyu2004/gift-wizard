import React, { useState } from 'react'
import Switch from 'react-switch';
// import Toggle from 'react-toggle';
// import "react-toggle/style.css";
import { ChangePassword } from '../../components/users';
import './Settings.css';

const Settings = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="settingsContainer">
      <h5>Personal Profile Settings:</h5>
      <div className = "public">
        <h6 className="publicText">Allow others to view your profile </h6>
        <div className= "switch">
          <Switch onChange={() => setIsPublic(!isPublic)} checked={isPublic}/>
        </div>
        {/* <Toggle onChange={() => setIsPublic(!isPublic)} checked={isPublic} /> */}
      </div>
      <div>
        <button className="passwordButton" onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</button>
        {showChangePassword && <ChangePassword />}
      </div>      
    </div>
  );
};

export default Settings;