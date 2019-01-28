import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import axios from "axios";
import {
  Modal,
  Button,
  OverlayTrigger,
  Popover,
  Tooltip
} from "react-bootstrap";

class ShowData extends React.Component {
  state = {
    show: false
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
    this.setState({ show: false });
  }


  handleShow = () => {
    this.setState({ show: true });
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
            <table className="table table-hover table-border">
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
                      <a href="#" onClick={() => this.handleShow()}>
                        <FontAwesomeIcon icon="edit" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              className="ant-pagination"
              defaultCurrent={this.props.currentPage}
              total={this.props.totalCount}
              onChange={this.props.pageChange}
            />
          </div>
        </div>
        <hr />
        <Button bsStyle="primary" bsSize="large" onClick={() => this.handleShow()}>
          <FontAwesomeIcon icon="edit" />
        </Button>
        <Modal
          show={this.state.show}
          animation={false}
          onHide={() => this.handleClose()}
          container={this}
          aria-labelledby="contained-modal-title"
          backdropClassName="model-back-grnd"
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
            <h4>Popover in a modal</h4>
            <p>
              there is a{" "}
              <OverlayTrigger overlay={popover}>
                <a href="#popover">popover</a>
              </OverlayTrigger>{" "}
              here
            </p>
            <h4>Tooltips in a modal</h4>
            <p>
              there is a{" "}
              <OverlayTrigger overlay={tooltip}>
                <a href="#tooltip">tooltip</a>
              </OverlayTrigger>{" "}
              here
            </p>
            <hr />
            <h4>Overflowing text to show scroll behavior</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>this.handleClose()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ShowData;
