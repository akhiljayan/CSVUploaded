import React, { Component } from "react";
import axios from "axios";
import ShowData from "./showData";
import { Navbar, Button, FormGroup, FormControl } from "react-bootstrap";

class Main extends Component {
  state = {
    file: null,
    loaded: 0,
    dataItems: { Employees: [] },
    currentPage: 0,
    pageSize: 10,
    totalCount: 0,
    browserMessage: "Choose file"
  };
  ping() {
    axios.get("http://localhost:8080/test").then(
      res => {
        alert("Received Successful response from server!" + res);
      },
      err => {
        alert("Server rejected response with: " + err);
      }
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios({
      mode: "no-cors",
      method: "post",
      url: "http://localhost:8080/upload",
      config: config,
      headers: {
        "content-type": "multipart/form-data"
      },
      data: formData
    }).then(result => {
      console.log(result);
      this.setState({
        dataItems: result.data,
        currentPage: result.data.CurrentPage,
        pageSize: result.data.PageSize,
        totalCount: result.data.TotalCount
      });
    });
  };

  handlePageChange = page => {
    let url = "http://localhost:8080/employees/" + page;
    axios.get(url).then(
      result => {
        console.log(result);
        this.setState({
          dataItems: result.data,
          currentPage: result.data.CurrentPage,
          pageSize: result.data.PageSize,
          totalCount: result.data.TotalCount
        });
      },
      err => {
        alert("Server rejected response with: " + err);
      }
    );
  };

  handleChange = event => {
    let fileName = event.target.files[0].name;
    this.setState({
      file: event.target.files[0],
      loaded: 0,
      browserMessage: fileName
    });
  };

  downloadAllData = () => {
    axios.get("http://localhost:8080/downloaAllCsv").then(
      res => {
        alert("Success!!! The file has been downloaded to the root folder.");
      },
      err => {
        alert("Server rejected response with: " + err);
      }
    );
  };

  downloadErrorData = () => {
    axios.get("http://localhost:8080/downloaErrorCsv").then(
      res => {
        alert("Success!!! The file has been downloaded to the root folder.");
      },
      err => {
        alert("Server rejected response with: " + err);
      }
    );
  };


  

  handleEdit = newEmp => {
    const url = "http://localhost:8080/edit/" + this.state.currentPage;
    axios({
      mode: "no-cors",
      method: "post",
      url: url,
      headers: {
        "content-type": "application/json"
      },
      data: newEmp
    }).then(result => {
      alert("Successfully Updated !!!");
      this.setState({
        dataItems: result.data,
        currentPage: result.data.CurrentPage,
        pageSize: result.data.PageSize,
        totalCount: result.data.TotalCount
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Rakuten : Technical Test
          </a>
          <form className="form-inline">
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  accept=".csv"
                  onChange={event => this.handleChange(event)}
                  className="custom-file-input cursor-pointer"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                />
                <label
                  className="custom-file-label browse-label"
                  htmlFor="inputGroupFile04"
                >
                  {this.state.browserMessage}
                </label>
              </div>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="inputGroupFileAddon04"
                  onClick={event => this.handleSubmit(event)}
                >
                  Show Data in Grid
                </button>
              </div>
            </div>
          </form>
        </nav>

        <div className="Main">
          <div className="main-pannel center">
            {this.state.dataItems.Employees.length > 0 ? (
              <React.Fragment>
                <div className="row">
                  <div className="col-md-12 download-button">
                    <button
                      className="btn btn-sm btn-primary pull-right m-l-5"
                      onClick={this.downloadAllData}
                    >
                      Download All Records
                    </button>

                    {" "}

                    <button
                      className="btn btn-sm btn-warning pull-right m-r-5"
                      onClick={this.downloadErrorData}
                    >
                      Download Error Records
                    </button>
                  </div>
                </div>

                <ShowData
                  data={this.state.dataItems}
                  currentPage={this.state.currentPage}
                  totalCount={this.state.totalCount}
                  pageSize={this.state.pageSize}
                  pageChange={this.handlePageChange}
                  onEdit={newEmp => this.handleEdit(newEmp)}
                />
              </React.Fragment>
            ) : (
              <span>Upoad .csv file to view the data</span>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
