import React, { Component } from 'react';
import { firestore } from "../base";
import { Container, Row, Col, Button } from 'reactstrap';
import './Main.css';

import TopBar from './TopBar';
import BudgetForm from '../BudgetForm/BudgetForm'

import intro from '../dollabills.jpeg'

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,

      firstName: null,
      lastName: null,
      show: false,
    }
  }

  componentWillMount() {
    this.getName();
  }

  getName = () => {
    if (!this.state.uid) return;

    let self = this;
    let userRef = firestore.collection("users").doc(this.state.uid);

    userRef.get().then((doc) => {
      if (doc.exists) {
        self.setState({
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
        });
      }
    }).catch((error) => {
      console.log("Error getting user:", error);
    })
  };

  switch = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  render() {
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };

    if (this.state.uid) {   // if user is signed in
      return (
        <div className="App">
          {/*<Container fluid className="topBar">
            <Row>
              <div className={"titlePic"}>
                <img src={intro} alt=""/>
              </div>
            </Row>
          </Container>*/}
          <TopBar signedIn={true} {...data}/>
          <br/>
          <br/>
          <br/>
          <Container>
            <Row className="space"/>
            <Row >
              <Col xs={4}/>
              <Col xs={4}>
                <h2 className="titleCash">{this.state.firstName}'s Cash Stash</h2>
              </Col>
              <Col xs={4}/>
            </Row>
            <Row>
              <Col xs={3}/>
              <Col xs={6}>
                {this.state.show
                  ?
                  <div>
                    <BudgetForm/>
                  </div>
                  :
                  <div>
                    <Button onClick={this.switch}>Get Started!</Button>
                  </div>
                }
              </Col>
              <Col xs={3}/>
            </Row>
          </Container>
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