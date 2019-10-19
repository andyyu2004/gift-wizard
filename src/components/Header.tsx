import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from '@reach/router';

type PropTypes = {
  title: string,
  subtitle?: string,
  displayLogin?: boolean,
}

const Header: React.FC<PropTypes> = props => {
  const { title, subtitle, displayLogin } = props;
  return (
    <Navbar bg="light" variant="light">
    <Navbar.Brand href="/"><b>Gift Wizard</b></Navbar.Brand>
    <Nav className="mr-auto">
      {/* <Nav.Link href="#home">Home</Nav.Link>*/}
    </Nav>
  { displayLogin && <Link to="/login">Log In/Sign Up</Link> } 
  </Navbar>
  )
}

Header.defaultProps = {
  displayLogin: false,
}
  

export default Header;