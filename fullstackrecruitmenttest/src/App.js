import React, { Component } from "react";
import Main from "./container/Main";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin/src/TapEventPlugin";
import "./App.css";

injectTapEventPlugin();
library.add(faEdit, faExclamationTriangle);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Main />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
