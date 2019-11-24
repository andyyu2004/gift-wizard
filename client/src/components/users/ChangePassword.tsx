import React from 'react';
import './ChangePassword.css';

const ChangePassword = () => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <label className="currentText">Current</label>
      <input className="currentBox" id="currentInput" />  
      <br />
      <label className="newText">New</label>
      <input className="newBox"/>
      <br />
      <label className="confirmText">Confirm</label>
      <input className="confirmBox"/>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ChangePassword;
