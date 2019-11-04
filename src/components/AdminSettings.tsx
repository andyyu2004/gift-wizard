import React, { useState } from 'react'
import { ChangePassword } from '.';

const AdminSettings = () => {

  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div>
      <div>
        <h5>Administrator Settings</h5>
        <button onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</button>
        {showChangePassword && <ChangePassword />}
      </div>      
    </div>
  );
};

export default AdminSettings;