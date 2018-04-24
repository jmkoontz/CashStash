import React, { Component } from 'react';
import {fireauth, firestore} from "./base";
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Modal, ModalHeader, ModalBody, ModalFooter, Collapse, Nav, NavbarBrand, NavItem, NavbarToggler, FormGroup, Form, Input, Alert } from 'reactstrap';
import './TopBar.css'
import logo from './logo.svg';

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorCode: "",
      visible: false,
      modal: false,
      open: true,

      sign: true,
    }

  }

  onFormSubmit = (ev) => {
    ev.preventDefault();  // stop page from redirecting
    let self = this;

    fireauth.signInWithEmailAndPassword(ev.target.email.value, ev.target.password.value).catch((error) => {
      self.setState({
        errorCode: error.message,
        visible: true,
      });
    });
  };

  // hide error message
  onDismiss = () => {
    this.setState({visible: false});
  };

  /*
   * Disables the modal or enables it
   */
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  /*
   * Creates an account using firebase
   */
  createAccount = (ev) => {
    ev.preventDefault();
    let self = this;

    self.setState({
      modal: !this.state.modal,
    });

    let firstName = ev.target.firstName.value;
    let lastName = ev.target.firstName.value;
    let email = ev.target.firstName.value;

    if (firstName === "") {
      self.setState({
        errorCode: "Please enter your first name",
        visible: true,
      });
    } else if (lastName === "") {
      self.setState({
        errorCode: "Please enter your last name",
        visible: true,
      });
    } else {
      fireauth.createUserAndRetrieveDataWithEmailAndPassword(email, ev.target.password.value).then(() => {
        self.setState({
          firstName: firstName,
          lastName: lastName,
          email: email,
        });

        self.addUser();
      }).catch((error) => {
        self.setState({
          errorCode: error.message,
          visible: true,
        })
      });
    }
  };

  /*
   * Adds a user to firebase
   */
  addUser = () => {
    let self = this;

    fireauth.onAuthStateChanged((user) => {
      if (user) {
        let userRef = firestore.collection("users").doc(user.uid);
        userRef.set({
          firstName: self.state.firstName,
          lastName: self.state.lastName,
          email: self.state.email,
        }).catch((error) => {
          self.setState({
            errorCode: error.message,
            visible: true,
          });
        });
      }
    });
  };

  /*
   * Signs you in using firebase
   */
  signIn = (ev) => {
    ev.preventDefault();  // stop page from redirecting
    let self = this;

    self.setState({
      modal: !this.state.modal,
    });

    fireauth.signInWithEmailAndPassword(ev.target.email.value, ev.target.password.value).catch((error) => {
      self.setState({
        errorCode: error.message,
        visible: true,
      });
    });
  };

  /*
   * Switches between the signin and create account tab
   */
  switch = () => {
    this.setState({
      sign: !this.state.sign,
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
              <NavItem>
                <Button onClick={this.toggle}>Sign In</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Container fluid>
          <Row>
            <Col>
              <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={false}>
                {this.state.sign
                  ?
                  <div>
                    <ModalHeader toggle={this.toggle}>
                      {/*<img src={logo} alt="" width="50" height="50"/>*/}
                      Sign In
                    </ModalHeader>
                  <Form onSubmit={(ev) => this.onFormSubmit(ev)}>
                    <ModalBody>
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
                    </ModalBody>
                  </Form>
                  </div>
                  :
                  <div>
                    <ModalHeader toggle={this.toggle}>
                      {/*<img src={logo} alt="" width="50" height="50"/>*/}
                      Create an account
                    </ModalHeader>
                  <Form onSubmit={(ev) => this.onFormSubmit(ev)}>
                    <ModalBody>
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
                    </ModalBody>
                  </Form>
                  </div>
                }
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default TopBar;