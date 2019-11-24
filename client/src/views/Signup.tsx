import { navigate, RouteComponentProps } from '@reach/router';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import API from '../api';
import './Signup.css';

const Signup: React.FC<RouteComponentProps> = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const inputRef: any = useRef(null);
  useEffect(() => inputRef.current.focus(), []); // Focus text input on load

  const handleCreateUser = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    (await API.createUser(username, email, password))
      .map(_ => navigate('/login'))
      .mapLeft(toast.error);
  };

  return (
    <div className='signUpForm'>
       <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            ref={inputRef}
            type="text" 
            placeholder="email" 
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="username" 
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
          onClick={handleCreateUser}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signup;


