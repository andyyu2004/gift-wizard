import React from 'react';
import './ChangePassword.css';

const ChangePassword = () => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="changePwd">
        <label className="pwd-label">Current Password: </label>
        <input className="pwd-inputbox" id="currentInput" />  
        <br />
        <label className="pwd-label">New Password: </label>
        <input className="pwd-inputbox"/>
        <br />
        <label className="pwd-label">Confirm Password:</label>
        <input className="pwd-inputbox"/>
        <br />
      </div>
      <button className="submit-btn" type="submit">Submit</button>
    </form>
  );
};

export default ChangePassword;
