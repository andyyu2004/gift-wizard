import React, { useState } from 'react'
import { ChangePassword } from './users';
import './AdminSettings.css';

const AdminSettings = () => {

  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="adminSettingPage">
      <div>
        <h5>Administrator Settings</h5>
        <button className="adminchangepwdButton" onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</button>
        {showChangePassword && <ChangePassword />}
      </div>      
    </div>
  );
};

export default AdminSettings;