import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router';
import { Header } from '../components';
import { Form, Button } from 'react-bootstrap';
import { useState, Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import { Action, UpdateUserTypeAction } from '../actions';
import { UserType } from '../types';


type PropType = 
  ReturnType<typeof mapStateToProps> 
  & ReturnType<typeof mapDispatchToProps>
  & RouteComponentProps;

const LoginView: React.FC<PropType> = props => {
  const { setUser } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleLoginSubmission = e => {
    e.preventDefault();
    console.log('submitted credentials', email, password);
    // Make some mock username password called admin admin for now
    if (email === "admin" && password === "admin") login(UserType.Admin);
    else if (email === "user" && password === "user") login(UserType.Regular);
    else setError("Invalid credentials");  
  }

  const login = (userType: UserType) => {
    setUser(userType);
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
      <Header title="Gift Wizard"/>
      <span>{error}</span>
      <div className='input-group w-auto'>
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

// type StateProps = (state: AppState) => {};
const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    setUser: (userType: UserType) => {
      const action: UpdateUserTypeAction = {
        type: "UPDATE_USER_TYPE",
        payload: { userType }
      }
      dispatch(action);
    },
  };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(LoginView);


