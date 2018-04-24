import React, { Component } from 'react';
import { fireauth } from './base';
import { Route, Switch, Redirect } from 'react-router-dom';
//import { Button } from 'reactstrap';
//import logo from './logo.svg';

import About from './About';
import HomePage from './HomePage';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      uid: null,
    }
  }

  // get auth status of user
  componentWillMount() {
    let self = this;

    this.getUserFromLocalStorage();

    fireauth.onAuthStateChanged((user) => {
      if (user)
        self.authHandler(user);
      else
        self.setState({uid: null});
    });
  }

  // get uid if it exists
  getUserFromLocalStorage() {
    const uid = localStorage.getItem("uid");
    if (uid != null)
      this.setState({uid: uid});
  }

  // set uid
  authHandler = (user) => {
    localStorage.setItem("uid", user.uid);
    this.setState({uid: user.uid});
  };

  // check if user is signed in
  signedIn = () => {
    return this.state.uid;
  };


  /*
  <div className="App">
        <header className="App-header">
          <img src={dollar} className="App-logo" alt="logo" />
          <h1 className="App-title">Cash Stash</h1>
        </header>
        <p className="App-intro">
          Team Members:  Jake Koontz, Riley Robertson, Jeremy Putnam
        </p>
      </div>
   */
  render() {
    return (
      <Switch>
        <Route path='/CashStash/About' render={() => (
          <About/>
        )}/>

        <Route path='/CashStash/HomePage' render={() => (
          this.signedIn()
            ? <HomePage uid={this.state.uid}/>
            : <Redirect to="/CashStash/About"/>
        )}/>

        <Route path='/CashStash/sign-in' render={() => (
          !this.signedIn()
            ? <SignIn/>
            : <Redirect to="/CashStash/HomePage"/>
        )}/>

        <Route path='/CashStash/create-account' render={() => (
          !this.signedIn()
            ? <CreateAccount/>
            : <Redirect to="/CashStash/HomePage"/>
        )}/>

        <Route render={() => <Redirect to="/CashStash/HomePage"/>}/>
      </Switch>
    );
  }
}

export default App;
