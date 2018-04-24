import React, { Component } from 'react';
import { fireauth } from "./base";
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Modal, ModalHeader, ModalBody, ModalFooter, Collapse, Nav, NavbarBrand, NavItem, NavbarToggler, FormGroup, Form, Input, Label, Alert } from 'reactstrap';
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

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  createAccount = () => {

  };

  signIn = () => {

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
                <ModalHeader toggle={this.toggle}>
                  {/*<img src={logo} alt="" width="50" height="50"/>*/}
                  Sign In Here
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
                      <Button onClick={this.createAccount}>Create Account</Button>{' '}
                      <Button onClick={this.signIn}>Sign In</Button>{' '}
                    </ModalFooter>
                  </ModalBody>
                </Form>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default TopBar;