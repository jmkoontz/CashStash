import {PieChart, Cell, Pie, Tooltip} from 'recharts';
import {Row, Col} from 'reactstrap';
import React, {Component} from 'react';

class FullPie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempArray: [],
    }
  }

  componentWillMount() {
    if (this.props.vals) {
      this.setState({
        tempArray: this.props.vals.data.items
      }, () => {
        this.setMonthlyValues();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.vals) {
      this.setState({
        tempArray: nextProps.vals.data.items
      }, () => {
        this.setMonthlyValues();
      });
    }
  }

  setMonthlyValues = () => {
    let temp = [];

    for (let i in this.state.tempArray) {
      if (this.state.tempArray.hasOwnProperty(i)) {
        let amount = this.state.tempArray[i].amount;
        amount = Math.round(amount * 100) / 100;

        temp.push({
          name: this.state.tempArray[i].name,
          amount: amount,
        })
      }
    }

    this.setState({tempArray: temp});
  };

  render() {
    const colors = [
      {color: "#353941"},
      {color: "#9cdb97"},
      {color: "#82c4cc"},
      {color: "#afa3cc"},
      {color: "#d67b77"},

      {color: "#3449a1"},
      {color: "#9cdff7"},
      {color: "#82addc"},
      {color: "#aa445c"},
      {color: "#d67667"},

      {color: "#35a331"},
      {color: "#9cffa7"},
      {color: "#80ffcc"},
      {color: "#a3a4dc"},
      {color: "#327"},

      {color: "#aa7741"},
      {color: "#dda797"},
      {color: "#8dda7c"},
      {color: "#afdda7"},
      {color: "#ddda77"},
    ];

    let temp = this.state.tempArray;
    return (
      <Row>
        <Col xs={1}/>
        <Col>
          <PieChart width={500} height={500}>
            <Pie data={temp} dataKey="amount" nameKey="name" cx="50%" cy="50%"
                 outerRadius={200} fill="#8884d8" label>
              {temp.map((entry, index) => <Cell key={entry.amount} fill={colors[index].color}/>)}
            </Pie><Tooltip/>
          </PieChart>
        </Col>
        <Col xs={{size: 4, offset: 1}} >
          <br/>
          {temp.map((entry, index) =>
            <p key={index} style={{color: colors[index].color, textAlign: "left"}}>■ {this.props.vals.data.items[index].name}</p>)}

        </Col>
      </Row>

    )
  }
}

export default FullPie