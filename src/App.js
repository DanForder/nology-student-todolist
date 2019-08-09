import React, { Component } from "react";
import "./App.scss";
import ToDoContainer from "./containers/ToDoContainer/ToDoContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDoContainer />
      </div>
    );
  }
}

export default App;
