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
      budgetName: "",
      incomeInput: "",
      nameInput: "",
      amountInput: "",

      errorCode: "",
      visible: false,
    };
  }

  componentWillMount() {
    //console.log("here");
    //console.log(this.state);
    //console.log(this.props);
    if (this.props.selectedBudget) {
      this.setState({
        budgetName: this.props.selectedBudget.data.name,
        incomeInput: this.props.selectedBudget.data.income,
        items: this.props.selectedBudget.data.items,
      });
    } else {
      this.setState({
        budgetName: "",
        incomeInput: "",
        items: [],
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    //console.log("receiving");
    //console.log(this.state);
    //console.log(this.props);
    if (nextProps.selectedBudget) {
      this.setState({
        budgetName: nextProps.selectedBudget.data.name,
        incomeInput: nextProps.selectedBudget.data.income,
        items: nextProps.selectedBudget.data.items,
      });
    } else {
      this.setState({
        budgetName: "",
        incomeInput: "",
        items: [],
      });
    }
  }

  submitBudget = (ev) => {
    ev.preventDefault();  // stop page from redirecting
    let self = this;

    let name = ev.target.name.value;
    let monthlyIncome = ev.target.monthlyIncome.value;

    // check for valid input
    if (name == null || name.length === 0) {
      this.setState({
        errorCode: "Please enter a name for the budget.",
        visible: true,
      });
    } else if (monthlyIncome == null || monthlyIncome.length === 0) {
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
      // reset error messages
      this.setState({
        errorCode: "",
        visible: false,
      });

      // write budget into Firebase
      let budgetRef = firestore.collection("users").doc(this.props.uid).collection("budgets").doc(this.getCode());
      budgetRef.set({
        name: name,
        income: parseInt(monthlyIncome, 10),
        items: self.state.items,
      }).catch((error) => {
        console.log("Error setting budget:", error);
      });

      window.location.reload();   // force reload page
    }
  };

  // generate a code for the budget in Firebase
  getCode = () => {
    if (this.props.selectedBudget)
      return this.props.selectedBudget.code;

    let code = "";
    for (let i = 0; i < 8; i++)
      code += Math.floor(Math.random() * 10);

    return code;
  };

  // check that all budget items have an amount inputted
  checkInputs = () => {
    for (let i in this.state.items) {
      if (this.state.items.hasOwnProperty(i)) {
        if (this.state.items[i].amount === "")
          return false;
      }
    }

    return true;
  };

  // add budget item to form
  addItem = (nameID, amountID) => {
    let name = this.state.nameInput;
    let amount = parseInt(this.state.amountInput, 10);

    // check for valid input
    if (name == null || name.length === 0) {
      this.setState({
        errorCode: "Please enter a category name.",
        visible: true,
      });
    } else if (isNaN(amount)) {
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
        nameInput: "",
        amountInput: "",
        collapse: false,
        errorCode: "",
        visible: false,
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

  // update item in the list when input is changed
  updateItem = (name, amount) => {
    let tmpItems = [];

    this.state.items.forEach((item) => {
      if (item.name === name)
        tmpItems.push({name: name, amount: amount});
      else
        tmpItems.push(item);
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

    onChangeComplete = (color) => {
        this.setState({ curColor : color.hex})
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
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
              {this.props.selectedBudget
                ?
                <h1 className={"centerText"}>{this.props.selectedBudget.data.name}</h1>
                :
                <h1 className={"centerText"}>Monthly Info</h1>
              }
              <hr/>
              <Form onSubmit={(ev) => this.submitBudget(ev)}>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Budget Name</InputGroupAddon>
                    <Input name="name" placeholder="Name" defaultValue={this.state.budgetName}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Monthly Income</InputGroupAddon>
                    <Input name="monthlyIncome" placeholder="Amount" defaultValue={this.state.incomeInput}/>
                  </InputGroup>
                </FormGroup>
                {allItems}
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                  {this.state.errorCode}
                </Alert>
                <FormGroup>
                  <Row>
                    <Col xs={6}>
                      <Button className="saveForm">Submit Budget</Button>
                    </Col>
                    <Col xs={6}>
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