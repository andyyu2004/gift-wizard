import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, navigate } from '@reach/router';
import usericon from '../images/user_icon.svg';
import './Header.css';

type PropTypes = {
  title: string,
  subtitle?: string,
  isLoggedIn?: boolean,
}

const Header: React.FC<PropTypes> = ({ title, subtitle, isLoggedIn }) => {
  return (
    <Navbar bg="light" variant="light">
    <Navbar.Brand id="navbar-brand" onClick={() => navigate("/")}><b>{title}</b></Navbar.Brand>
    <Navbar.Text onClick={() => navigate("/")}>{subtitle}</Navbar.Text>
    <Nav className="mr-auto">
      {/* <Nav.Link href="#home">Home</Nav.Link>*/}
    </Nav>
    
  { isLoggedIn 
      ? <img src={usericon} className="small-icon" onClick={() => navigate("profile")}/> 
      : <Link to="/login">Log In/Sign Up</Link> } 
  </Navbar>
  )
}

Header.defaultProps = {
  isLoggedIn: false,
}
  

export default Header;