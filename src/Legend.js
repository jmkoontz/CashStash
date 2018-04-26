
import React, { Component } from 'react';


/*const data = [{name: "Living Expense", value: 300, color: "#00C49F"},{name: "Food", value: 250, color: "#55B8D9"},
    {name: "Luxury", value: 200, color: "#E8F576"},{name: "Entertainment", value: 100, color: "#B855D9"},
    {name: "Gas", value: 50, color: "#FF8042"}];*/

class Legend extends Component{


    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                {this.props.vals.data.items.map((entry, index) =>
                <p key={index} style={{color: colors[index].color}}>■ {this.props.vals.data.items[index].name}</p>
            )}
            </div>
        )
    }
}


export default Legend;