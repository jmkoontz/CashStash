import React, { Component } from 'react';
import { fireauth } from "./base";
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';


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
        <Form onSubmit={this.onFormSubmit()}>
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