import { Link, navigate } from '@reach/router';
import React, { MouseEvent } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import usericon from '../images/profile_pic_placeholder.png';
import { AppState } from '../reducers';
import { UserState } from '../reducers/userReducer';
import { UserType } from 'shared/types';
import './Header.css';
import API from '../api';
import { toast, ToastContainer } from 'react-toastify';

type PropTypes = {
  title: string,
  subtitle?: string,
};

const Header: React.FC<PropTypes> = ({ title, subtitle }) => {
  
  const { user } = useSelector<AppState, UserState>(state => state.user)
  const dispatch = useDispatch();

  const handleLogout = async (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      /** Destroy session and reset redux store */
      (await API.logout()).map(msg => {
        toast.success(msg);
        navigate('/login');
        dispatch({ type: "LOGOUT" });
      }).mapLeft(toast.error);
  };

  return (
    <Navbar bg="light" variant="light">
    <Navbar.Brand id="navbar-brand" style={{cursor:"pointer"}} onClick={() => navigate("/")}><b>{title}</b></Navbar.Brand>
    <Navbar.Text>{subtitle}</Navbar.Text>
    
    {/* This creates the spacing, don't remove */}
    <Nav className="mr-auto">
      {/* <Nav.Link href="#home">Home</Nav.Link>*/}
    </Nav>
    <ToastContainer />
    {user && user.type !== UserType.None
      /** If logged in, then take user to dashboard if admin else take to profile, else redirect to login screen */
      ? (<div>
          <img src={usericon} className="small-icon" onClick={() => navigate(`/${user.type === UserType.Admin ? 'admin' : 'profile'}`)} alt="profilepic" /> 
          <button id="logoutButton" type="button" onClick={handleLogout}>Logout</button>
        </div>)
      : <button type="button" className="loginBtn" onClick={() => navigate(`/login`)}>Log In / Sign Up</button>} 
  </Navbar>
  );
};

  

export default Header;