import React, { useState } from 'react'
import Switch from 'react-switch';
// import Toggle from 'react-toggle';
// import "react-toggle/style.css";
import { ChangePassword } from '../../components/users';

const Settings = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div>
      <h5>Settings</h5>
      <h6>Public Profile?</h6>
      <Switch onChange={() => setIsPublic(!isPublic)} checked={isPublic} />
      {/* <Toggle onChange={() => setIsPublic(!isPublic)} checked={isPublic} /> */}
      <div>
        <button onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</button>
        {showChangePassword && <ChangePassword />}
      </div>      
    </div>
  );
};

export default Settings;

