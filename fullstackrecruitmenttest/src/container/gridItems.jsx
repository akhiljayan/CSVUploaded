import React, { Component } from "react";
import EmployeeItem from './employeeItem';

class GridItems extends Component {
  state = {};
  render() {
    let itemNodes = this.props.data[this.props.activePage - 1].map(function(
      emp
    ) {
      return <EmployeeItem employee={emp} id={emp.Id} key={emp.Id}/>;
    });
    return <ul className="list-group">{itemNodes}</ul>;
  }
}

export default GridItems;
