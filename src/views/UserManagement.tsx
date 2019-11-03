import React, { useState } from 'react'
import { fakeusers } from '../mockdata/mockpeople';
import { User } from '../types';

const UserManagement = () => {
  const users = fakeusers;
  const [currentUser, setCurrentUser] = useState<User>();

  const handleViewUser = (user: User) => {
    if (currentUser === user) return setCurrentUser(undefined);
    return setCurrentUser(user);
  };

  return (
    <div>
      <h4>User Management</h4>
      {users.map(user => <button className="generic-button" key={user.userid} onClick={() => handleViewUser(user)}>{user.name}</button>)}
      {currentUser && <div>{currentUser.name}</div>}
    </div>
  );
};

export default UserManagement
