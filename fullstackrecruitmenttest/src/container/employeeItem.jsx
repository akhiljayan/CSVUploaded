import React, { Component } from 'react';

class EmployeeItem extends Component {
    state = {  }
    render() { 
        return (<li className="list-group-item">{this.props.employee.Name} - {this.props.employee.Id}</li>)
    }
}
 
export default EmployeeItem;