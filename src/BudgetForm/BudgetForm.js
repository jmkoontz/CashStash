import React, { Component } from 'react';
import { fireauth } from "../base";
import { NavLink } from 'react-router-dom';
import { Form, FormGroup,InputGroup, Label, InputGroupAddon, Input, Button, Container, Row, Col } from 'reactstrap';

import dollar from '../dollar.svg'

import './BudgetForm.css'

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
                <Container fluid>
                    <Row>
                        /*Top Bar goes here*/
                    </Row>
                    <Row>

                        <Col>
                            <Form>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType={"prepend"}>Monthly Income</InputGroupAddon>
                                        <Input placeholder={"1000.00"}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType={"prepend"}>Living Expense</InputGroupAddon>
                                        <Input placeholder={"1000.00"}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType={"prepend"}>Food</InputGroupAddon>
                                        <Input placeholder={"1000.00"}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType={"prepend"}>Entertainment</InputGroupAddon>
                                        <Input placeholder={"1000.00"}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                    <Col>
                                        <Button>+</Button>
                                    </Col>
                                    <Col>
                                        <Button className={"saveForm"}>Save</Button>
                                    </Col>
                                    </Row>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col/>
                        <Col/>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default BudgetForm;