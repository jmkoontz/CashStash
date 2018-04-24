import React, { Component } from 'react';
import { fireauth } from "./base";
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import logo from './logo.svg';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      errorCode: "",
      visible: false,
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

  render() {
    return (
      <div>
        <Form onSubmit={(ev) => this.onFormSubmit(ev)}>
          <FormGroup>
            <img src={logo} alt="" width="100" height="100"/>
          </FormGroup>
          <FormGroup>
            <Label className="h3 font-weight-normal" for="exampleEmail">Please Sign In</Label>
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
          <Button size="lg">Sign In</Button>
        </Form>
      </div>
    )
  }
}

export default SignIn;