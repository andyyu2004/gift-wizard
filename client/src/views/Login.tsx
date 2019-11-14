import { RouteComponentProps, navigate } from '@reach/router';
import React, { useCallback, useState, useRef, useEffect, MouseEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateUserType } from '../actions/actionCreaters';
import { UserType } from 'shared/types';
import './Login.css';
import API from '../api';
import { toast } from 'react-toastify';


const LoginView: React.FC<RouteComponentProps> = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const inputRef: any = useRef(null);
  useEffect(() => inputRef.current.focus(), []); // Focus text input on load

  const handleLoginSubmission = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    (await API.login(username, password)).match(
      error => { toast.error(error) },
      user => {}
    );

    console.log('submitted credentials', username, password);
    // Make some mock username password called admin admin for now
    if (username === "admin" && password === "admin") login(UserType.Admin);
    else if (username === "user" && password === "user") login(UserType.Regular);
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
    <div className='loginForm'>
      <span style={{color: "red"}}>{error}</span>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            ref={inputRef}
            type="text" 
            placeholder="email/username" 
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}/>
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
        <Button onClick={() => navigate('/signup')}>
            create
        </Button>
      </Form>
    </div>
  );
}


export default LoginView;


