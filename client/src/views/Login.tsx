import { navigate, RouteComponentProps } from '@reach/router';
import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
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
      if (user.type === UserType.Admin) return navigate('/admin');
      else return navigate('/');
    }).mapLeft(toast.error);
  };

  return (
    <div className='loginForm'>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
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
        <div className = "buttonContainer">
          <button className = "loginButton"
            type="submit"
            onClick={handleLoginSubmission}>
            Login
          </button>
          <button className = "loginButton"
            onClick={() => navigate('/signup')}>
            Sign up
          </button>
        </div>
      </Form>
    </div>
  );
}


export default LoginView;


