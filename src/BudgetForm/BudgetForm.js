import React, {Component} from 'react';
import {firestore} from "../base";
import {Form, FormGroup, InputGroup, Collapse, InputGroupAddon, Input, Alert, Button, Container, Row, Col, Card, CardBody, CardTitle} from 'reactstrap';

import './BudgetForm.css'

class BudgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],

      collapse: false,
      nameInput: "",
      amountInput: "",

      errorCode: "",
      visible: false,
    };
  }

  submitBudget = (ev) => {
    ev.preventDefault();  // stop page from redirecting
    let self = this;

    let monthlyIncome = ev.target.monthlyIncome.value;

    // check for valid input
    if (monthlyIncome == null || monthlyIncome.length === 0) {
      this.setState({
        errorCode: "Please enter a monthly income.",
        visible: true,
      });
    } else if (this.checkInputs() === false) {
      this.setState({
        errorCode: "Please enter an amount for each category.",
        visible: true,
      });
    } else {
      console.log("written!");
    }
  };

  checkInputs = () => {
    this.state.items.forEach((item) => {
      if (item.amount === "")
        return false;
    });

    return true;
  };

  // add budget item to form
  addItem = (nameID, amountID) => {
    let name = this.state.nameInput;
    let amount = this.state.amountInput;

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

      // reset form
      document.getElementById(nameID).value = "";
      document.getElementById(amountID).value = "";
    }
  };

  // remove budget item from form
  removeItem = (item) => {
    let tmpItems = this.state.items.filter((obj) => {
      return obj.name !== item.name;
    });

    this.setState({items: tmpItems});
  };

  updateNameInputValue = (name) => {
    this.setState({nameInput: name});
  };

  updateAmountInputValue = (amount) => {
    this.setState({amountInput: amount});
  };

  updateItem = (name, amount) => {
    let tmpItems = this.state.items.filter((item) => {
      return item.name !== name;
    });

    tmpItems.push({name: name, amount: amount});

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
          <Input onChange={(ev) => this.updateItem(item.name, ev.target.value)} placeholder="Amount" defaultValue={item.amount}/>
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
        <Container fluid>
          <Row>
            <Col>
              <h1 className={"centerText"}>Monthly Info</h1>
              <hr/>
              <Form onSubmit={(ev) => this.submitBudget(ev)}>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Budget Name</InputGroupAddon>
                    <Input name="name" placeholder="Name"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Monthly Income</InputGroupAddon>
                    <Input name="monthlyIncome" placeholder="Amount"/>
                  </InputGroup>
                </FormGroup>
                {/*<FormGroup>
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
                </FormGroup>*/}
                {allItems}
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                  {this.state.errorCode}
                </Alert>
                <FormGroup>
                  <Row>
                    <Col>
                      <Button onClick={this.toggleCollapse} style={{marginBottom: '1rem'}}>+</Button>
                      <Collapse isOpen={this.state.collapse}>
                        <Card>
                          <CardBody>
                            <CardTitle>New Category</CardTitle>
                            <FormGroup>
                              <Input onChange={(ev) => this.updateNameInputValue(ev.target.value)} id="nameInput" placeholder="Category Name"/>
                            </FormGroup>
                            <FormGroup>
                              <Input onChange={(ev) => this.updateAmountInputValue(ev.target.value)} id="amountInput" placeholder="Amount"/>
                            </FormGroup>
                            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                              {this.state.errorCode}
                            </Alert>
                            <Button block onClick={() => this.addItem("nameInput", "amountInput")}>Add to Budget</Button>
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
          </Row>
        </Container>
      </div>
    )
  }
}



export default BudgetForm;