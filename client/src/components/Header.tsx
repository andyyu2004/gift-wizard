import { navigate } from '@reach/router';
import React, { MouseEvent, useCallback, useEffect } from 'react';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { UserType } from 'shared/types';
import { updateUser } from '../actions/actionCreaters';
import API from '../api';
import usericon from '../images/profile_pic_placeholder.png';
import { AppState } from '../reducers';
import { UserState } from '../reducers/userReducer';
import './Header.css';
import { DisplayNotification } from '.';
import { compose } from '../util/functional';
import useSocket from '../hooks/useSocket';

type PropTypes = {
  title: string,
  subtitle?: string,
};

const Header: React.FC<PropTypes> = ({ title, subtitle }) => {
  const { user } = useSelector<AppState, UserState>(state => state.user)
  const notifications = user && user.notifications || [];
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleLogout = async (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      /** Destroy session, socket, and reset redux store */
      socket && socket.close();
      (await API.logout()).map(msg => {
        toast.success(msg);
        navigate('/login');
        dispatch({ type: "LOGOUT" });
      }).mapLeft(toast.error);
  };

  const fetchNotifications = useCallback(async () => {
    (await API.getUser(user!._id))
      .map(compose(dispatch, updateUser))
      .mapLeft(() => toast.error("Failed to update notifications"));
  }, [user]);

  /** Initialize socket listeners on connection */
  useEffect(() => {
    if (!socket) return;
    socket.on('refresh-notifications', fetchNotifications);
    socket.on('success', toast.success);
    socket.on('err', toast.error);
    return () => {
      socket.off('refresh-notifications', fetchNotifications);
      socket.off('success');
      socket.off('err');
    };
  }, [socket, fetchNotifications]);

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand id="navbar-brand" style={{cursor:"pointer"}} onClick={() => navigate("/")}><b>{title}</b></Navbar.Brand>
      <Navbar.Text>{subtitle}</Navbar.Text>
      
      {/* This creates the spacing, don't remove */}
      <Nav className="mr-auto">
        {/* <Nav.Link href="#home">Home</Nav.Link>*/}
      </Nav>
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
      {user && user.type !== UserType.None
        /** If logged in, then take user to dashboard if admin else take to profile, else redirect to login screen */
        ? (<>
            <span className="header-username">{user.username}</span>
            <Dropdown className="header-notification">
              <Dropdown.Toggle className='header-button header-notification' id="notification-toggle">
                {/* <img src={notificationicon} alt="Notifications" className="small-generic-icon" /> */}
                <span>{notifications.length}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {notifications.length
                  ? notifications.map(n => <DisplayNotification notification={n} key={n._id} />)
                  : <h6 className='notification-message'>No notifications</h6>
                }
              </Dropdown.Menu>
            </Dropdown>
            <div>
              <img src={usericon} className="small-icon" onClick={() => navigate(`/${user.type === UserType.Admin ? 'admin' : 'profile'}`)} alt="profilepic" /> 
              <button id="logoutButton" type="button" onClick={handleLogout}>Logout</button>
            </div>
          </>)
        : <button type="button" className="loginBtn" onClick={() => navigate(`/login`)}>Log In / Sign Up</button>} 
    </Navbar>
  );
};

  

export default Header;