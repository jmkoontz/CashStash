import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {PieChart, Cell, Pie, Tooltip} from 'recharts';

class FinalValue extends Component {

  addUp = (value) => {
    for (let index in this.props.budget.data.items) {
      value += this.props.budget.data.items[index].amount;
    }

    value = this.props.budget.data.income - value;
    return value;
  };


  render() {
    let x = 0;

    let theData = [{name: "Saved", amount: this.addUp(x)}, {
      name: "Spent",
      amount: this.props.budget.data.income - this.addUp(x)
    }];

    const colors = [
      {color: "#9cdb97"},
      {color: "#d67667"},
    ];

    return (
      <Row>
        <Col xs={1}/>
        <Col>
          <PieChart width={500} height={500}>
            <Pie data={theData} dataKey="amount" nameKey="name" cx="50%" cy="50%"
                 outerRadius={200} fill="#8884d8" label>
              {theData.map((entry, index) => <Cell key={entry.amount} fill={colors[index].color}/>)}
            </Pie><Tooltip/>
          </PieChart>
        </Col>
        <Col xs={{size: 4, offset: 1}} >
          <br/>
          <p style={{color: "#9cdb97", textAlign: "left"}}>■ Saved</p>
          <p style={{color: "#d67667", textAlign: "left"}}>■ Spent</p>
        </Col>
      </Row>
    )
  }
}

export default FinalValue