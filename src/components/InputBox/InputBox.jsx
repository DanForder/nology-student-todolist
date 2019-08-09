import React, { Component } from "react";

class InputBox extends Component {
  render() {
    return (
      <input
        onChange={this.props.setSearchText}
        placeholder="Add a task!"
        value={this.props.searchText}
        type="text"
      />
    );
  }
}

export default InputBox;
