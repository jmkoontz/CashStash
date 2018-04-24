import React, { Component } from 'react';
import { fireauth } from "./base";
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Modal, ModalHeader, ModalBody, ModalFooter, Collapse, Nav, NavbarBrand, NavItem, NavbarToggler } from 'reactstrap';
import './About.css'
import TopBar from './TopBar';


import logo from './logo.svg';
import dollar from './dollar.svg'


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,
      errorCode: "",
      visible: false,
      modal: false,
      open: true,
    }

  }


  render() {
    if (this.state.uid) { // if user is signed in
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