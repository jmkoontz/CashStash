import { PieChart, Cell, Pie, Tooltip } from 'recharts';
import React, { Component } from 'react';


/*const data = [{name: "Living Expense", value: 300, color: "#00C49F"},{name: "Food", value: 250, color: "#55B8D9"},
    {name: "Luxury", value: 200, color: "#E8F576"},{name: "Entertainment", value: 100, color: "#B855D9"},
    {name: "Gas", value: 50, color: "#FF8042"}];*/

class Legend extends Component{


    render() {
        return (
            this.props.vals.map((entry, index) =>
                <p style={{color: this.props.vals[index].color}}>■ {this.props.vals[index].name}</p>
            )

        )
    }
}

export default Legend