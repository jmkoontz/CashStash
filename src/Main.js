import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './Main.css';

import TopBar from './TopBar';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,
    }
  }

  render() {
    if (this.state.uid) {   // if user is signed in
      return (
        <div className={"App"}>
          <TopBar signedIn={true}/>
          <Row className={"space"}/>
          <Row>
            <Col xs={4}/>
            <Col xs={4}>
              <h2 className={"titleCash"}>Cash Stash</h2>
            </Col>
            <Col xs={4}/>
          </Row>
        </div>
      )
    } else {  // if user is not signed in
      return (
        <div className={"App"}>
          <TopBar signedIn={false}/>
          <Row className={"space"}/>
          <Row>
            <Col xs={4}/>
            <Col xs={4}>
              <h2 className={"titleCash"}>Cash Stash</h2>
            </Col>
            <Col xs={4}/>
          </Row>
        </div>
      )
    }
  }
}

export default Main;