import React, { Component } from 'react';
import { fireauth } from "../base";
import { Container, Row, Col, Button, Navbar, Modal, ModalHeader, ModalBody, Collapse, Nav, NavbarBrand, NavItem, NavbarToggler } from 'reactstrap';
import './TopBar.css'

import SignIn from './Account/SignIn';
import CreateAccount from './Account/CreateAccount';

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalSignIn: false,
      modalCreateAccount: false,
      open: true, // TODO why is this needed
    }
  }

  // toggle sign in modal
  toggleSignIn = () => {
    this.setState({
      modalSignIn: !this.state.modalSignIn,
      modalCreateAccount: false,
    });
  };

  // toggle create account modal
  toggleCreateAccount = () => {
    this.setState({
      modalCreateAccount: !this.state.modalCreateAccount,
      modalSignIn: false,
    });
  };

  // sign user out of application
  handleSignOut = () => {
    localStorage.removeItem('uid');   // remove user from local storage
    this.setState({uid: null});   // reset state
    fireauth.signOut();   // sign out from firebase
    window.location.reload();   // force reload page
  };

  render() {
    return (
      <div className={"App"}>
        <Navbar className="bg-dark" light expand={"md"}>
          <NavbarBrand className="head">Cash$tash</NavbarBrand>
          <NavbarToggler className="mr-2"/>
          <Collapse isOpen={!this.state.open} navbar>
            <Nav className="ml-auto" navbar>
              <Col hidden={this.props.signedIn}>
                <NavItem>
                  <Button onClick={this.toggleSignIn}>Sign In</Button>
                </NavItem>
              </Col>
              <Col hidden={this.props.signedIn}>
                <NavItem>
                  <Button onClick={this.toggleCreateAccount}>Create Account</Button>
                </NavItem>
              </Col>
              <Col hidden={!this.props.signedIn}>
                <NavItem>
                  <Button onClick={this.handleSignOut}>Sign Out</Button>
                </NavItem>
              </Col>
            </Nav>
          </Collapse>
        </Navbar>

        <Container fluid>
          <Row>
            <Col>
              <Modal isOpen={this.state.modalSignIn} toggle={this.toggleSignIn} backdrop={false}>
                <div>
                  <ModalHeader toggle={this.toggleSignIn}>
                    {/*<img src={logo} alt="" width="50" height="50"/>*/}
                    Sign In
                  </ModalHeader>
                  <ModalBody>
                    <SignIn/>
                  </ModalBody>
                </div>
              </Modal>
              <Modal isOpen={this.state.modalCreateAccount} toggle={this.toggleCreateAccount} backdrop={false}>
                <div>
                  <ModalHeader toggle={this.toggleCreateAccount}>
                    {/*<img src={logo} alt="" width="50" height="50"/>*/}
                    Create an account
                  </ModalHeader>
                  <ModalBody>
                    <CreateAccount/>
                  </ModalBody>
                </div>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default TopBar;