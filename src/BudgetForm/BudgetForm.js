import React, {Component} from 'react';
import {firestore} from "../base";
import {Form, FormGroup, InputGroup, Collapse, InputGroupAddon, Input, Alert, Button, Container, Row, Col, Card, CardBody, CardTitle} from 'reactstrap';

import './BudgetForm.css'
import TopBar from '../Main/TopBar';

class BudgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],

      collapse: false,

      errorCode: "",
      visible: false,
    }
  }

  submitBudget = (ev) => {
    ev.preventDefault();  // stop page from redirecting
    let self = this;


  };

  // add budget item to form
  addItem = (ev, formID) => {
    ev.preventDefault();  // stop page from redirecting

    let name = ev.target.name.value;
    let amount = ev.target.amount.value;

    // check for valid input
    if (name == null || name.length === 0) {
      this.setState({
        errorCode: "Please enter a category name.",
        visible: true,
      });
    } else if (amount == null || amount.length === 0) {
      this.setState({
        errorCode: "Please enter an amount value.",
        visible: true,
      });
    } else if (this.state.items.find((item) => {return item.name === name;})) {
      this.setState({
        errorCode: "Category already exists.",
        visible: true,
      });
    } else {
      this.setState({
        items: this.state.items.concat({name: name, amount: amount}),
        collapse: false,
      });

      document.getElementById(formID).reset();  // reset form
    }
  };

  // remove budget item from form
  removeItem = (item) => {
    let tmpItems = this.state.items.filter((obj) => {
      return obj.name !== item.name;
    });

    this.setState({items: tmpItems});
  };

  // toggle collapse for adding a new category
  toggleCollapse = () => {
    this.setState({collapse: !this.state.collapse});
  };

  // hide error message
  onDismiss = () => {
    this.setState({visible: false});
  };

  // render individual input in each thing
  renderItem = (item) => {
    return (
      <FormGroup key={item.name}>
        <InputGroup>
          <InputGroupAddon addonType={"prepend"}>{item.name}</InputGroupAddon>
          <Input placeHolder="Amount" defaultValue={item.amount}/>
          <InputGroupAddon addonType={"append"}>
            <Button onClick={() => {this.removeItem(item)}}>-</Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    )
  };

  render() {
    let allItems = [];

    this.state.items.forEach((item) => {
      let itemInput = this.renderItem(item);
      allItems = allItems.concat(itemInput);
    });

    return (
      <div>
        <TopBar/>
        <Container fluid>
          <br/>
          <br/>
          <br/>
          <br/>
          <Row>
            <Col/>
            <Col>
              <h1 className={"centerText"}>Monthly Info</h1>
              <hr/>
              <Form onSubmit={(ev) => {this.submitBudget(ev)}}>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Monthly Income</InputGroupAddon>
                    <Input placeholder="Amount"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Living Expense</InputGroupAddon>
                    <Input placeholder="Amount"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Food</InputGroupAddon>
                    <Input placeholder="Amount"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Entertainment</InputGroupAddon>
                    <Input placeholder="Amount"/>
                  </InputGroup>
                </FormGroup>
                {allItems}
                <FormGroup>
                  <Row>
                    <Col>
                      <Button onClick={this.toggleCollapse} style={{marginBottom: '1rem'}}>+</Button>
                      <Collapse isOpen={this.state.collapse}>
                        <Card>
                          <CardBody>
                            <CardTitle>New Category</CardTitle>
                            <Form onSubmit={(ev) => this.addItem(ev, "add-event-form")} id={"add-event-form"}>
                              <FormGroup>
                                <Input name="name" placeholder="Category Name"/>
                              </FormGroup>
                              <FormGroup>
                                <Input name="amount" placeholder="Amount"/>
                              </FormGroup>
                              <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                                {this.state.errorCode}
                              </Alert>
                              <Button block>Add to Budget</Button>
                            </Form>
                          </CardBody>
                        </Card>
                      </Collapse>
                    </Col>
                    <Col>
                      <Button className="saveForm">Submit Budget</Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
            </Col>
            <Col/>
          </Row>
        </Container>
      </div>
    )
  }
}

export default BudgetForm;