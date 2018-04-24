import React, { Component } from 'react';
import { fireauth } from "./base";
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import logo from './logo.svg';
import dollar from './dollar.svg'

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorCode: "",
      visible: false,
    }
  }

  // hide error message
  onDismiss = () => {
    this.setState({visible: false});
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={dollar} className="App-logo" alt="logo" />
          <h1 className="App-title">Cash Stash</h1>
        </header>
        <p className="App-intro">
          Team Members:  Jake Koontz, Riley Robertson, Jeremy Putnam
        </p>
      </div>
    )
  }
}

export default HomePage;