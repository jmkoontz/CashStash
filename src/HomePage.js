import React, { Component } from 'react';
import { fireauth } from "./base";
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import logo from './logo.svg';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorCode: "",
      visible: false,
    }
  }

  onFormSubmit = (ev) => {
    ev.preventDefault();  // stop page from redirecting
    let self = this;

    fireauth.signInWithEmailAndPassword(ev.target.email.value, ev.target.password.value).catch((error) => {
      self.setState({
        errorCode: error.message,
        visible: true,
      });
    });
  };

  // hide error message
  onDismiss = () => {
    this.setState({visible: false});
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to our CS252 Project</h1>
        </header>
        <p className="App-intro">
          Team Members:  Jake Koontz, Riley Robertson, Jeremy Putnam
        </p>
        <NavLink to="/CashStash/sign-in">
          <Button>Sign In</Button>
        </NavLink>
        <NavLink to="/CashStash/create-account">
          <Button>Create Account</Button>
        </NavLink>
      </div>
    )
  }
}

export default HomePage;