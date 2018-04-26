import React, {Component} from 'react';
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

        let theData = [{name: "Saved", amount: this.addUp(x)},{name: "Spent", amount: this.props.budget.data.income - this.addUp(x)}];

        const colors = [
            {color: "#9cdb97"},
            {color: "#d67667"},
        ];

        return (
            <PieChart width={550} height={550}>
                <Pie data={theData} dataKey="amount" nameKey="name" cx="50%" cy="50%"
                     outerRadius={200} fill="#8884d8" label>
                    {theData.map((entry, index) => <Cell key={entry.amount} fill={colors[index].color}/>)}
                </Pie><Tooltip/>
            </PieChart>
        )
    }
}

export default FinalValue