import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCheckCircle,
//   faTimesCircle,
//   faPencilAlt
// } from "@fortawesome/free-solid-svg-icons";
import Task from "../Task/Task";

class TaskList extends Component {
  state = {};

  populateList() {
    if (this.props.list) {
      return this.props.list.map((task, key) => {
        return this.props.archiveTask ? (
          <Task
            task={task}
            key={key}
            confirmEditTask={this.props.confirmEditTask}
            archiveTask={this.props.archiveTask}
            deleteTask={this.props.deleteTask}
          />
        ) : (
          <Task
            task={task}
            key={key}
            confirmEditTask={this.props.confirmEditTask}
            unarchiveTask={this.props.unarchiveTask}
            deleteTask={this.props.deleteTask}
          />
        );
      });
    }
    return null;
  }

  render() {
    return this.populateList();
  }
}

export default TaskList;
