import { navigate, RouteComponentProps } from '@reach/router';
import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { UserType } from 'shared/types';
import { setUser, updateUserType } from '../actions/actionCreaters';
import API from '../api';
import './Login.css';


const LoginView: React.FC<RouteComponentProps> = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const inputRef: any = useRef(null);
  useEffect(() => inputRef.current.focus(), []); // Focus text input on load

  const handleLoginSubmission = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    (await API.login(username, password)).map(user => {
      dispatch(setUser(user));
      navigate('/');
    }).mapLeft(toast.error);


    // console.log('submitted credentials', username, password);
    // Make some mock username password called admin admin for now
    // if (username === "admin" && password === "admin") login(UserType.Admin);
    // else if (username === "user" && password === "user") login(UserType.Regular);
    // else setError("Invalid credentials");
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
        <Button style = {{marginRight: "20px", width: "77.75px"}}
          variant="primary" 
          type="submit"
          onClick={handleLoginSubmission}>
          Login
        </Button>
        <Button onClick={() => navigate('/signup')}>
            Sign up
        </Button>
      </Form>
    </div>
  );
}


export default LoginView;


