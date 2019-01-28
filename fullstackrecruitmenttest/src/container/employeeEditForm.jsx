import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl,
  Tooltip
} from "react-bootstrap";

class EmployeeEditForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      Id: this.props.employee.Id,

      Name: this.props.employee.Name,
      nameError: "",
      nameValidationStatus: null,

      Department: this.props.employee.Department,
      departmentError: "",
      departmentValidationStatus: null,

      Salary: this.props.employee.Salary,
      salaryerror: "",
      salaryValidationStatus: null,

      JoiningDate: this.props.employee.JoiningDate,
      joiningDateError: "",
      joiningDateValidationStatus: null,

      Designation: this.props.employee.Designation,
      designations: [
        "Developer",
        "Senior Developer",
        "Manager",
        "Team Lead",
        "VP",
        "CEO"
      ]
    };
  }

  componentDidMount() {
    this.getNameValidationState(this.props.employee.Name);
    this.getDepartmentValidationState(this.props.employee.Department);
    this.getSalaryValidationState(this.props.employee.Salary);
    this.getJoiningDateValidationState(this.props.employee.JoiningDate);
  }

  getNameValidationState(name) {
    let errorcount = 0;
    if (!/^[a-zA-Z ]+$/.test(name)) {
      this.setState({ nameError: "This field should only have alphabets!!" });
      errorcount++;
    }
    if (errorcount > 0) {
      this.setState({ nameValidationStatus: "error" });
    } else {
      this.setState({ nameError: "", nameValidationStatus: "success" });
    }
  }

  getDepartmentValidationState(department) {
    let errorcount = 0;
    if (!/^[a-zA-Z0-9-_* ]+$/.test(department)) {
      this.setState({
        departmentError:
          "This field should only have alpha numerics with _* or - characters."
      });
      errorcount++;
    }
    if (errorcount > 0) {
      this.setState({ departmentValidationStatus: "error" });
    } else {
      this.setState({
        departmentError: "",
        departmentValidationStatus: "success"
      });
    }
  }

  getSalaryValidationState(salary) {
    let errorcount = 0;
    if (!/^[a-zA-Z0-9-_* ]+$/.test(salary)) {
      this.setState({
        salaryError:
          "This field should only have alpha numerics with _* or - characters."
      });
      errorcount++;
    }
    if (errorcount > 0) {
      this.setState({ salaryValidationStatus: "error" });
    } else {
      this.setState({ salaryError: "", salaryValidationStatus: "success" });
    }
  }

  getJoiningDateValidationState(joiningDate) {  
    let errorcount = 0;
    if (!/^[0-9-]+$/.test(joiningDate)) {
      this.setState({
        joiningDateError:
          "This field should be of format yyyy-mm-dd date format. "
      });
      errorcount++;
    }
    if (errorcount > 0) {
      this.setState({ joiningDateValidationStatus: "error" });
    } else {
      this.setState({ joiningDateError: "", joiningDateValidationStatus: "success" });
    }
  }

  handleChange(e, field) {
    switch (field) {
      case "name":
        this.setState({ Name: e.target.value });
        this.getNameValidationState(e.target.value);
        break;
      case "department":
        this.setState({ Department: e.target.value });
        this.getDepartmentValidationState(e.target.value);
        break;
      case "salary":
        this.setState({ Salary: e.target.value });
        this.getSalaryValidationState(e.target.value);
        break;
      case "joiningDate":
        this.setState({ JoiningDate: e.target.value });
        this.getJoiningDateValidationState(e.target.value);
        break;
      case "designation":
        this.setState({ Designation: e.target.value });
      default:
        console.log("");
    }
  }

  prepareSave = event => {
    event.preventDefault();
    this.props.onSave({
      Id: this.state.Id,
      Name: this.state.Name,
      Department: this.state.Department,
      Designation: this.state.Designation,
      Salary: this.state.Salary,
      JoiningDate: this.state.JoiningDate
    });
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.state.nameValidationStatus}
          >
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              required
              value={this.state.Name}
              placeholder="Enter Name"
              onChange={e => this.handleChange(e, "name")}
            />
            <FormControl.Feedback />
            <HelpBlock>{this.state.nameError}</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
            validationState={this.state.departmentValidationStatus}
          >
            <ControlLabel>Department</ControlLabel>
            <FormControl
              type="text"
              required
              value={this.state.Department}
              placeholder="Enter Department"
              onChange={e => this.handleChange(e, "department")}
            />
            <FormControl.Feedback />
            <HelpBlock>{this.state.departmentError}</HelpBlock>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Designation</ControlLabel>
            <FormControl
              required
              componentClass="select"
              value={this.state.Designation}
              placeholder="select"
              onChange={e => this.handleChange(e, "designation")}
            >
              <option value="Developer">Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Team Lead">Team Lead</option>
              <option value="VP">VP</option>
              <option value="CEO">CEO</option>
            </FormControl>
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
            validationState={this.state.salaryValidationStatus}
          >
            <ControlLabel>Salary</ControlLabel>
            <FormControl
              type="number"
              required
              value={this.state.Salary}
              placeholder="Enter Salary"
              onChange={e => this.handleChange(e, "salary")}
            />
            <FormControl.Feedback />
            <HelpBlock>{this.state.salaryError}</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
            validationState={this.state.joiningDateValidationStatus}
          >
            <ControlLabel>Joining Date</ControlLabel>
            <FormControl
              type="text"
              required
              value={this.state.JoiningDate}
              placeholder="Enter Joining Date [yyyy-mm-dd format]"
              onChange={e => this.handleChange(e, "joiningDate")}
            />
            <FormControl.Feedback />
            <HelpBlock>{this.state.joiningDateError}</HelpBlock>
          </FormGroup>
        </form>

        <hr />

        <div className="row">
          <div className="col-md-12">
            <button
              className="btn btn-outline-danger pull-right m-l-5"
              type="button"
              id="inputGroupFileAddon04"
              onClick={() => this.props.onClose()}
            >
              Close
            </button>{" "}
            <button
              className="btn btn-outline-success pull-right  m-r-5"
              type="button"
              id="inputGroupFileAddon04"
              onClick={event => this.prepareSave(event)}
            >
              Save
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeEditForm;
