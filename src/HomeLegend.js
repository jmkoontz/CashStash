import React, { Component } from 'react';


class HomeLegend extends Component{


    render() {
        return (
            this.props.vals.map((entry, index) =>
                <p style={{color: this.props.vals[index].color}}>■ {this.props.vals[index].name}</p>
            )

        )
    }
}

export default HomeLegend