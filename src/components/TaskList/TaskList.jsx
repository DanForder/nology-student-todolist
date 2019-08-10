import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";

class TaskList extends Component {
  state = {};

  // setEditText = event => {
  //   const editText = event.target.value;
  //   console.log(editText);
  //   this.setState({ editText });
  // };

  populateList() {
    if (this.props.list) {
      return this.props.list.map((task, key) => {
        return this.state.editable ? (
          <li key={key}>
            <input value={task} />
          </li>
        ) : (
          <li key={key}>
            {task}{" "}
            {this.props.archiveTask ? (
              <button onClick={() => this.props.archiveTask(task)}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </button>
            ) : (
              <button onClick={() => this.props.deleteTask(task)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            )}
            <button onClick={() => this.props.editTask(task)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </li>
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
