import React, { Component } from "react";
import axios from "axios";
import ShowData from "./showData";

class Main extends Component {
  state = { file: null, loaded: 0, dataItems:[] };
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
    }).then(result =>{
      console.log(result);
      this.setState({dataItems : result.data});
    });
  };

  uploadFile = event => {
    event.preventDefault();
    const url = "http://localhost:8080/upload";
    const formData = new FormData();
    formData.append("file", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    fetch(url, {
      mode: "no-cors",
      method: "POST",
      body: formData,
      config: config
    }).then((result) => {
      console.log(result);
    });
  };

  handleChange = event => {
    this.setState({
      file: event.target.files[0],
      loaded: 0
    });
  };

  render() {
    return (
      <div className="Main">
        <h1>Welcome to React</h1>
        <div>
          <button onClick={this.ping}>Ping!</button>
          <form>
            <input
              accept=".csv"
              type="file"
              onChange={event => this.handleChange(event)}
            />
            <button onClick={event => this.handleSubmit(event)}> Submit </button>
          </form>
          <ShowData data={this.state.dataItems} page={1}/>
        </div>  
      </div>
    );
  }
}

export default Main;
