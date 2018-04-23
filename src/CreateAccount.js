import React, { Component } from 'react';
import { fireauth, firestore } from "./base";
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

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

    if (ev.target.firstName.value === "") {
      self.setState({
        errorCode: "Please enter your first name",
        visible: true,
      });
    } else if (ev.target.lastName.value === "") {
      self.setState({
        errorCode: "Please enter your last name",
        visible: true,
      });
    } else {
      fireauth.createUserAndRetrieveDataWithEmailAndPassword(ev.target.email.value, ev.target.password.value).then(() => {
        self.setState({
          firstName: ev.target.firstName.value,
          lastName: ev.target.lastName.value,
          email: ev.target.email.value,
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

  }
}