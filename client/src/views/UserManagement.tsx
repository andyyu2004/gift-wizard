import React, { useState } from 'react'
import { fakeusers } from '../mockdata/mockpeople';
import { User } from 'shared/types';
import PersonalProfile from './PersonalProfile';

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
      {users.map(user => <button className="generic-button" key={user._id} onClick={() => handleViewUser(user)}>{user.firstname} {user.surname}</button>)}
      {currentUser && <PersonalProfile user={currentUser} />}
    </div>
  );
};

export default UserManagement