import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';

import './BudgetList.css';

class BudgetList extends Component {
  constructor(props) {
    super(props);
  }

  // render individual input in each thing
  renderBudget = (budget) => {
    if (this.props.selectedBudget != null && this.props.selectedBudget.data.name === budget.data.name) {
      return (
        <ListGroup key={budget.data.name}>
          <ListGroupItem className="selectedBudget" tag="button"
                         onClick={() => this.props.loadBudget(budget)}>{budget.data.name}</ListGroupItem>
        </ListGroup>
      )
    } else {
      return (
        <ListGroup key={budget.data.name}>
          <ListGroupItem className="defaultBudget" tag="button"
                         onClick={() => this.props.loadBudget(budget)}>{budget.data.name}</ListGroupItem>
        </ListGroup>
      )
    }
  };

  render() {
    let allBudgets = [];

    this.props.budgets.forEach((budget) => {
      let budgetInput = this.renderBudget(budget);
      allBudgets = allBudgets.concat(budgetInput);
    });

    return (allBudgets);
  }
}

export default BudgetList;