import React, { Component } from 'react';
import { fireauth } from "./base";
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Modal, ModalHeader, ModalBody, ModalFooter, Collapse, Nav, NavbarBrand, NavItem, NavbarToggler } from 'reactstrap';
import './About.css'
import TopBar from './TopBar';

import logo from './logo.svg';

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorCode: "",
      visible: false,
      modal: false,
      open: true,
    }

  }


  render() {
    return (
      <div className={"App"}>
        <TopBar/>
      </div>
    )
  }
}

export default About;