import { PieChart, Cell, Pie, Tooltip } from 'recharts';
import React, { Component } from 'react';


/*const data = [{name: "Living Expense", value: 300, color: "#00C49F"},{name: "Food", value: 250, color: "#55B8D9"},
    {name: "Luxury", value: 200, color: "#E8F576"},{name: "Entertainment", value: 100, color: "#B855D9"},
    {name: "Gas", value: 50, color: "#FF8042"}];*/

class HomeWeeklyPie extends Component{

    setWeeklyValues = () => {
        for(let value in this.props.vals) {
            this.props.vals[value].value = Math.trunc(this.props.vals[value].value/4);
        }
    };

    render() {
        this.setWeeklyValues();
        return (
            <PieChart width={500} height={500}>
                <Pie data={this.props.vals} dataKey="value" nameKey="name" cx="50%" cy="50%"
                     outerRadius={200} fill="#8884d8" label>{
                    this.props.vals.map((entry, index) => <Cell key={entry} fill={this.props.vals[index].color}/>)
                } </Pie><Tooltip/>
            </PieChart>
        )
    }
}

export default HomeWeeklyPie