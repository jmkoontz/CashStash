import { PieChart, Cell, Pie, Tooltip } from 'recharts';
import React, { Component } from 'react';

class DailyPie extends Component{

    setDailyValues = () => {
        for(let value in this.props.vals.data.items) {
            this.props.vals.data.items[value].amount = Math.trunc(this.props.vals.data.items[value].amount/7);        }
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


        this.setDailyValues();
        return (
            <PieChart width={500} height={500}>
                <Pie data={this.props.vals.data.items} dataKey="amount" nameKey="name" cx="50%" cy="50%"
                     outerRadius={200} fill="#8884d8" label>{
                    this.props.vals.data.items.map((entry, index) => <Cell key={entry.amount/7} fill={colors[index].color}/>)
                } </Pie><Tooltip/>
            </PieChart>
        )
    }
}

export default DailyPie