import React, { Component } from 'react';

class Legend extends Component{


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


        return (
            <div>
                <br/>
                {this.props.vals.data.items.map((entry, index) =>
                <p key={index} style={{color: colors[index].color}}>■ {this.props.vals.data.items[index].name}</p>
            )}

            </div>
        )
    }
}

export default Legend