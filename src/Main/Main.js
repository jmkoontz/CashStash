import React, { Component } from 'react';
import { firestore } from "../base";
import { Row, Col } from 'reactstrap';
import './Main.css';

import TopBar from './TopBar';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,

      firstName: null,
      lastName: null,

      budget: [],
    }
  }

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    if (!this.state.uid) return;

    let self = this;
    let userRef = firestore.collection("users").doc(this.state.uid);

    userRef.onSnapshot((doc) => {
      if (doc.exists) {
        self.setState({
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          budget: doc.data().budget,
        });
      }
    }).catch((error) => {
      console.log("Error getting user:", error);
    })
  };

  render() {
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };

    if (this.state.uid) {   // if user is signed in
      return (
        <div className="App">
          <TopBar signedIn={true} {...data}/>
          <br/>
          <br/>
          <br/>
          <Row className="space"/>
          <Row>
            <Col xs={4}/>
            <Col xs={4}>
              <h2 className="titleCash">{this.state.firstName}'s Cash Stash</h2>
            </Col>
            <Col xs={4}/>
          </Row>
        </div>
      )
    } else {  // if user is not signed in
      return (
        <div className="App">
          <TopBar signedIn={false} {...data}/>
          <br/>
          <br/>
          <br/>
          <Row className="space"/>
          <Row>
            <Col xs={4}/>
            <Col xs={4}>
              <h2 className="titleCash">Cash Stash</h2>
            </Col>
            <Col xs={4}/>
          </Row>
        </div>
      )
    }
  }
}

export default Main;