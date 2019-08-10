import React, { Component } from "react";
import "./App.scss";
import ToDoContainer from "./containers/ToDoContainer/ToDoContainer";

class App extends Component {
  state = { user: "" };

  render() {
    return (
      <div className="App">
        <header>
          <h1>Oh What... To Do?</h1>
          <div>User Auth</div>
        </header>
        <ToDoContainer />
      </div>
    );
  }
}

export default App;
