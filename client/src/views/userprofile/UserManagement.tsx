import React, { useState, useEffect } from 'react'
import { User } from 'shared/types';
import PersonalProfile from './PersonalProfile';
import API from '../../api';
import { toast } from 'react-toastify';
import './UserManagement.css';

const UserManagement = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  const handleViewUser = (user: User) => {
    if (currentUser === user) return setCurrentUser(undefined);
    return setCurrentUser(user);
  };

  useEffect(() => {
    (async () => (await API.getAllUsers())
      .map(setUsers)
      .mapLeft(toast.error))();
  }, []);

  return (
    <div className="userManagementPage">
      <h4>User Management</h4>
      {users.map(user => <button className="userButton" key={user._id} onClick={() => handleViewUser(user)}>{user.firstname} {user.surname}</button>)}
      {currentUser && <PersonalProfile user={currentUser} />}
    </div>
  );
};

export default UserManagement
