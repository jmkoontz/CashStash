import React, { Component } from 'react';
import { fireauth, firestore } from "./base";
import { Form, FormGroup, Input, Button, Alert, Col } from 'reactstrap';

class CreateAccount extends Component {
  constructor() {
    super();

    this.state = {
      errorCode: "",
      visible: false,
    };
  }

  onFormSubmit = (ev) => {
    ev.preventDefault();  // stop page from redirecting
    let self = this;

    // save values from inputs
    let firstName = ev.target.firstName.value;
    let lastName = ev.target.lastName.value;
    let email = ev.target.email.value;

    // check for valid input
    if (firstName === "") {
      self.setState({
        errorCode: "Please enter your first name.",
        visible: true,
      });
    } else if (lastName === "") {
      self.setState({
        errorCode: "Please enter your last name.",
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

  // add user information to firebase
  addUser = () => {
    let self = this;

    fireauth.onAuthStateChanged((user) => {
      if (user) {
        let userRef = firestore.collection("users").doc(user.uid);
        userRef.set({
          firstName: self.state.firstName,
          lastName: self.state.lastName,
          email: self.state.email,
        }).then(() => {
          window.location.reload();   // force reload page
        }).catch((error) => {
          self.setState({
            errorCode: error.message,
            visible: true,
          });
        });
      }
    });
  };

  // hide error message
  onDismiss = () => {
    this.setState({visible: false});
  };

  render() {
    return (
      <div>
        <Form onSubmit={(ev) => this.onFormSubmit(ev)}>
          <FormGroup row>
            <Col xs={6}>
              <Input name="firstName" id="exampleFirstName" placeholder="First Name"/>
            </Col>
            <Col xs={6}>
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
          <Button size="lg" block>Create Account</Button>
        </Form>
      </div>
    )
  }
}

export default CreateAccount;