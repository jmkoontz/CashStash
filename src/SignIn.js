import React, { Component } from 'react';
import { fireauth } from "./base";

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


  }
}

export default SignIn;