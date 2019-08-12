import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCheckCircle,
  faTimesCircle,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";

class Task extends Component {
  state = { editable: false, editValue: "" };

  componentDidMount() {
    this.setState({ editValue: this.props.task });
  }

  setEditText = event => {
    const editValue = event.target.value;
    console.log(editValue);
    this.setState({ editValue: editValue });
  };

  toggleEdit = task => {
    //console.log(task);
    //console.log(this.state.editValue);
    //if edit value is equal to task, do nothing except toggle editable
    //otherwise call a method on container to update firestore to new value

    console.log("toggling edit mode for " + task);
    this.setState({ editable: !this.state.editable });
  };

  render() {
    return this.state.editable ? (
      <li>
        <input
          onChange={this.setEditText}
          placeholder={this.state.editValue}
          value={this.state.editValue}
          type="text"
        />
        <button
          onClick={() => {
            this.toggleEdit(this.state.editValue);
            this.props.confirmEditTask(this.props.task, this.state.editValue);
          }}
        >
          Confirm Edit
        </button>
      </li>
    ) : (
      <li>
        {this.props.task}
        {this.props.archiveTask ? (
          <React.Fragment>
            <button onClick={() => this.toggleEdit(this.props.task)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
            <button onClick={() => this.props.archiveTask(this.props.task)}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
            <button
              onClick={() =>
                this.props.deleteTask(this.props.task, "currentTasks")
              }
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button onClick={() => this.props.unarchiveTask(this.props.task)}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
            <button
              onClick={() =>
                this.props.deleteTask(this.props.task, "completedTasks")
              }
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </React.Fragment>
        )}
      </li>
    );
  }
}

export default Task;
