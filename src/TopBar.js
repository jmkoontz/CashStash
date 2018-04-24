import React, { Component } from 'react';
import { Container, Row, Col, Button, Navbar, Modal, ModalHeader, ModalBody, ModalFooter, Collapse, Nav, NavbarBrand, NavItem, NavbarToggler, FormGroup, Form, Input, Alert } from 'reactstrap';
import './TopBar.css'
import logo from './logo.svg';

import SignIn from './SignIn';
import CreateAccount from './CreateAccount';

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      open: true,

      sign: true,

      modalSignIn: false,
      modalCreateAccount: false,
    }

  }

  /*
   * Disables the modal or enables it
   */
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  toggleSignIn = () => {
    this.setState({
      modalSignIn: !this.state.modalSignIn,
      modalCreateAccount: false,
    });
  };

  toggleCreateAccount = () => {
    this.setState({
      modalCreateAccount: !this.state.modalCreateAccount,
      modalSignIn: false,
    });
  };

  render() {
    return (
      <div className={"App"}>
        <Navbar className="bg-dark" light expand={"md"}>
          <NavbarBrand className={"head"}>Cash$tash</NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="mr-2" />
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
                  <Button>Sign Out</Button>
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