import { RouteComponentProps } from '@reach/router';
import React, { useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateUserType } from '../actions/actionCreaters';
import { UserType } from '../types';
import './Login.css';


const LoginView: React.FC<RouteComponentProps> = ({ navigate }) => {  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();


  const handleLoginSubmission = e => {
    e.preventDefault();
    console.log('submitted credentials', email, password);
    // Make some mock username password called admin admin for now
    if (email === "admin" && password === "admin") login(UserType.Admin);
    else if (email === "user" && password === "user") login(UserType.Regular);
    else setError("Invalid credentials");  
  }

  const setUserType = useCallback((userType: UserType) => dispatch(updateUserType(userType)), [dispatch]);

  const login = (userType: UserType) => {
    setUserType(userType);
    switch (userType) {
      case UserType.Admin:
        navigate("/admin");
        break;
      case UserType.Regular:
        navigate("/");
        break;
      }
  }

  return (
    <>
      <span style={{color: "red"}}>{error}</span>
      
      <div className='loginForm'>
        <p>Login Details: user/user or admin/admin for now</p>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="email/username" 
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="password" 
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit"
            onClick={handleLoginSubmission}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}


export default LoginView;


