import React, { Component } from 'react';
import { fireauth } from "../base";
import { Container, Row, Col, Button, Navbar, Modal, ModalHeader, ModalBody, Collapse, Nav, NavbarBrand, NavItem, NavbarToggler, NavLink } from 'reactstrap';
import './TopBar.css'

import SignIn from '../Account/SignIn';
import CreateAccount from '../Account/CreateAccount';

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      modalSignIn: false,
      modalCreateAccount: false,
    }
  }

  // toggle navbar
  toggleNavbar = () => {
    this.setState({open: !this.state.open});
  };

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
      <div className={"navT"}>
        <Navbar className="bg-dark" light expand={"md"}>
          <NavbarBrand className="head">Cash$tash</NavbarBrand>
          <NavbarToggler className="mr-2" onClick={this.toggleNavbar} outline/>
          <Collapse isOpen={this.state.open} navbar>
            <Nav className="ml-auto" navbar>
              <div className={"pad"} hidden={!this.props.signedIn}>
                <NavItem>
                  <NavbarBrand className="name">{this.props.firstName} {this.props.lastName}</NavbarBrand>
                </NavItem>
              </div>
              <div hidden={this.props.signedIn}>
                <NavItem>
                  <NavLink onClick={this.toggleSignIn}><Button>Sign In</Button></NavLink>
                </NavItem>
              </div>
              <div hidden={this.props.signedIn}>
                <NavItem>
                  <NavLink onClick={this.toggleCreateAccount}><Button>Create Account</Button></NavLink>
                </NavItem>
              </div>
              <div hidden={!this.props.signedIn}>
                <NavItem>
                  <NavLink onClick={this.handleSignOut}><Button>Sign Out</Button></NavLink>
                </NavItem>
              </div>
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