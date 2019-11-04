import React from 'react'

const ChangePassword = () => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <label>Current</label>
      <input id="currentInput" />  
      <br />
      <label>New</label>
      <input />
      <br />
      <label>Confirm</label>
      <input />
      <br />
      <input type="submit" />
    </form>
  );
};

export default ChangePassword;
