import React, { Component } from "react";

class TaskList extends Component {
  state = {};

  populateList() {
    if (this.props.list) {
      return this.props.list.map((task, key) => {
        return <li key={key}>{task}</li>;
      });
    }
    return null;
  }

  render() {
    return this.populateList();
  }
}

export default TaskList;
