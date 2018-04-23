import React, { Component } from 'react';
import {Container, Row, Col, Button, Jumbotron} from 'reactstrap';
import logo from './logo.svg';
import dollar from './dollar.svg';
import './App.css';

import firebase from './base.js';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Row/>
        <header className="App-header">
          <img src={dollar} className="App-logo" alt="logo" />
          <h1 className="App-title">Cash Stash</h1>
        </header>
        <p className="App-intro">
          Team Members:  Jake Koontz, Riley Robertson, Jeremy Putnam
        </p>
      </div>
    );
  }
}

export default App;
