import React, { Component } from "react";

class InputBox extends Component {
  render() {
    return (
      <input
        onChange={this.props.setAddTaskText}
        placeholder="Add a task!"
        value={this.props.addTaskText}
        type="text"
      />
    );
  }
}

export default InputBox;
