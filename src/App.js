import React, { Component } from 'react';
import { fireauth } from './base';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Main from './Main/Main';

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
        <Route exact path='/CashStash/Home' render={() => (
          <Main uid={this.state.uid}/>
        )}/>

        <Route render={() => <Redirect to='/CashStash/Home'/>}/>
      </Switch>
    );
  }
}

export default App;
