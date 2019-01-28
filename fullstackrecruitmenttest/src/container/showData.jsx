import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import axios from "axios";
import EmployeeEditForm from './employeeEditForm';
import {
  Modal,
  Button,
  OverlayTrigger,
  Popover,
  Tooltip
} from "react-bootstrap";

class ShowData extends React.Component {
  state = {
    show: false,
    empItem : {}
  };

  changePage(page) {
    let url = "http://localhost:8080/employees/" + page;
    axios.get(url).then(
      res => {
        console.log(res);
        alert("Received Successful response from server!" + res);
      },
      err => {
        alert("Server rejected response with: " + err);
      }
    );
  }

  handleClose() {
    this.setState({ show: false, empItem: {} });
  }

  handleShow = (item) => {
    this.setState({ show: true, empItem: item });
  };

  setErrorMessage = (errorMessage) => {
    return "aliya set";
  };

  handleFormSave = (newEmp) => {
    this.props.onEdit(newEmp);
    this.handleClose();
  };

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
      <div>
        <div className="container">
          <div className="text-center">
            <table className="table table-hover table-border data-table-view">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Department</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Joining Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.Employees.map(item => (
                  <tr
                    key={item.Id}
                    className={item.HasError ? "table-danger" : ""}
                  >
                    <th scope="row">{item.Id}</th>
                    <td>{item.Name}</td>
                    <td>{item.Department}</td>
                    <td>{item.Designation}</td>
                    <td>{item.Salary}</td>
                    <td>{item.JoiningDate}</td>
                    <td>
                      {item.HasError ? (
                        <a title="" className="p-10 cursor-pointer">
                          <FontAwesomeIcon
                            icon="exclamation-triangle"
                            className="red-color"
                          />
                        </a>
                      ) : (
                        <span />
                      )}

                      <a
                        href="#"
                        className={item.HasError ? "p-10" : "p-10"}
                        onClick={() => this.handleShow(item)}
                      >
                        <FontAwesomeIcon icon="edit" className="" />
                      </a>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <Pagination
          className="ant-pagination"
          defaultCurrent={this.props.currentPage}
          total={this.props.totalCount}
          onChange={this.props.pageChange}
        />

        <Modal
          show={this.state.show}
          animation={false}
          onHide={() => this.handleClose()}
          container={this}
          aria-labelledby="contained-modal-title"
          backdropClassName="model-back-grnd"
        >
          <Modal.Header>
            <Modal.Title>Edit details of {this.state.empItem.Name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EmployeeEditForm employee={this.state.empItem} onSave={(newEmp)=>this.handleFormSave(newEmp)} onClose={() => this.handleClose()}/>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={() => this.handleClose()}>Close</Button>
          </Modal.Footer> */}
        </Modal>
      </div>
    );
  }
}

export default ShowData;
