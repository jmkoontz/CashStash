import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Modal, ModalHeader, ModalBody, ModalFooter, Collapse, Nav, NavbarBrand, NavItem, NavbarToggler, FormGroup, Form, Input, Alert } from 'reactstrap';
import './TopBar.css'
import logo from './logo.svg';

import SignIn from './SignIn';
import CreateAccount from './CreateAccount';

class TopBar extends Component {
  constructor() {
    super();

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
              <Col>
                <NavItem>
                  <Button onClick={this.toggleSignIn}>Sign In</Button>
                </NavItem>
              </Col>
              <Col>
                <NavItem>
                  <Button onClick={this.toggleCreateAccount}>Create Account</Button>
                </NavItem>
              </Col>
              {/*<Col>
                <NavItem>
                  <Button>Sign Out</Button>
                </NavItem>
              </Col>*/}
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
                    {/*
                      <FormGroup>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Email"/>
                      </FormGroup>
                      <FormGroup>
                        <Input type="password" name="password" id="examplePassword" placeholder="Password"/>
                      </FormGroup>
                      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        {this.state.errorCode}
                      </Alert>
                      <ModalFooter>
                        <Button onClick={this.switch}>Create Account</Button>{' '}
                        <Button onClick={(ev) => this.signIn(ev)}>Sign In</Button>{' '}
                      </ModalFooter>
                        */}
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
                    {/*
                      <FormGroup row>
                        <Col sm={6}>
                          <Input name="firstName" id="exampleFirstName" placeholder="First Name"/>
                        </Col>
                        <Col sm={6}>
                          <Input name="lastName" id="exampleLastName" placeholder="Last Name"/>
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Email"/>
                      </FormGroup>
                      <FormGroup>
                        <Input type="password" name="password" id="examplePassword" placeholder="Password"/>
                      </FormGroup>
                      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        {this.state.errorCode}
                      </Alert>
                      <ModalFooter>
                        <Button onClick={(ev) => this.createAccount(ev)}>Create Account</Button>{' '}
                        <Button onClick={this.switch}>Sign In</Button>{' '}
                      </ModalFooter>
                      */}
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