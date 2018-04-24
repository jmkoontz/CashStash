import React, { Component } from 'react';
import { fireauth } from "../base";
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';

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

    fireauth.signInWithEmailAndPassword(ev.target.email.value, ev.target.password.value).then(() => {
      window.location.reload();   // force reload page
    }).catch((error) => {
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
            <Input type="email" name="email" id="exampleEmail" placeholder="Email"/>
          </FormGroup>
          <FormGroup>
            <Input type="password" name="password" id="examplePassword" placeholder="Password"/>
          </FormGroup>
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            {this.state.errorCode}
          </Alert>
          <Button size="lg" block>Sign In</Button>
        </Form>
      </div>
    )
  }
}

export default SignIn;