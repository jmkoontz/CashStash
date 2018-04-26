import { PieChart, Cell, Pie, Tooltip } from 'recharts';
import React, { Component } from 'react';


/*const data = [{name: "Living Expense", value: 300, color: "#00C49F"},{name: "Food", value: 250, color: "#55B8D9"},
    {name: "Luxury", value: 200, color: "#E8F576"},{name: "Entertainment", value: 100, color: "#B855D9"},
    {name: "Gas", value: 50, color: "#FF8042"}];*/

class FullPie extends Component{

    constructor(props) {
        super(props);

        this.state = {
            tempArray : [],
        }
    }

    componentWillMount () {
        this.makeTempArray();
        this.setMonthlyValues();
    }

  

    makeTempArray = () => {
        for(let value in this.props.vals.data.items) {
            this.state.tempArray[value] = this.props.vals.data.items[value];
        }
    };

    setMonthlyValues = () => {
        let temp = this.state.tempArray;
        for(let value in temp) {
            temp[value].amount = Math.trunc(temp[value].amount);
        }
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
            <PieChart width={500} height={500}>
                <Pie data={temp} dataKey="amount" nameKey="name" cx="50%" cy="50%"
                     outerRadius={200} fill="#8884d8" label>
                    {temp.map((entry, index) => <Cell key={entry.amount} fill={colors[index].color}/>)}
                </Pie><Tooltip/>
            </PieChart>
        )
    }
}

export default FullPie