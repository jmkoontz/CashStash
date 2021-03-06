import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';

import './BudgetList.css';

class BudgetList extends Component {
  // render individual input in each thing
  renderBudget = (budget) => {
    if (this.props.selectedBudget != null && this.props.selectedBudget.data.name === budget.data.name) {
      return (
        <ListGroup key={budget.data.name}>
          <ListGroupItem className="selectedBudget"
                         onClick={() => this.props.loadBudget(budget)}>{budget.data.name}</ListGroupItem>
        </ListGroup>
      )
    } else {
      return (
        <ListGroup key={budget.data.name}>
          <ListGroupItem className="defaultBudget"
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