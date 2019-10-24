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

const Header: React.FC<PropTypes> = props => {
  const { title, subtitle, isLoggedIn } = props;
  return (
    <Navbar bg="light" variant="light">
    <Navbar.Brand onClick={() => navigate("/")}><b>{title}</b></Navbar.Brand>
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