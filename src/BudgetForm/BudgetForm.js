import React, { Component } from 'react';
import { fireauth } from "../base";
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import dollar from '../dollar.svg'

class BudgetForm extends Component {
    constructor(props) {
        super(props);

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

            </div>
        )
    }
}

export default BudgetForm;