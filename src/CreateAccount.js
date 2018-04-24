import React, { Component } from 'react';
import { fireauth, firestore } from "./base";
import { Form, FormGroup, Input, Button, Alert, Col } from 'reactstrap';

class CreateAccount extends Component {
  constructor() {
    super();

    this.state = {
      uid: null,

      errorCode: "",
      visible: false,
    };
  }

  onFormSubmit = (ev) => {
    ev.preventDefault();
    let self = this;

    let firstName = ev.target.firstName.value;
    let lastName = ev.target.lastName.value;
    let email = ev.target.email.value;

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

  onDismiss = () => {
    this.setState({visible: false});
  };

  render() {
    return (
      <div>
        <Form onSubmit={(ev) => this.onFormSubmit(ev)}>
          <FormGroup row>
            <Col sm={6}>
              <Input name="firstName" id="exampleFirstName" placeholder="First Name" />
            </Col>
            <Col sm={6}>
              <Input name="lastName" id="exampleLastName" placeholder="Last Name" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
          </FormGroup>
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            {this.state.errorCode}
          </Alert>
          <FormGroup>
            <Button className="createAccountButton" size="lg" block>Create Account!</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default CreateAccount;