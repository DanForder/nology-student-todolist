import React, { Component } from "react";
import firebase, { firestore } from "../../firebase";
import TaskList from "../../components/TaskList/TaskList";
import InputBox from "../../components/InputBox/InputBox";

class ToDoContainer extends Component {
  state = {
    userID: null,
    userData: {},
    completedTasksVisible: true,
    currentTasksVisible: true,
    addTaskText: ""
  };

  fetchData() {
    firestore
      .collection("users")
      .doc(this.props.user.uid)
      .get()
      .then(querySnapshot => {
        // const userData = Object.entries(querySnapshot.docs).map(data => {
        //   return { ...data.data(), docId: data.id };
        // });
        const userData = querySnapshot.data();
        this.setState({
          userData: {
            completedTasks: userData.completedTasks,
            currentTasks: userData.currentTasks
          }
        });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    // firestore
    //   .collection("users")
    //   .get()
  }

  componentDidMount() {
    this.fetchData();
    this.setState({ userID: this.props.user.uid });
  }

  setTaskAddText = event => {
    const addTaskText = event.target.value;
    // console.log(addTaskText);
    this.setState({ addTaskText });
  };

  //TODO: needs to rerender on add or delete task!

  addTask = task => {
    firestore
      .collection("users")
      .doc(this.state.userID)
      .update({
        currentTasks: firebase.firestore.FieldValue.arrayUnion(task)
      });

    console.log(`task "${task}" added`);
    this.fetchData();

    this.setState({ addTaskText: "" });
  };

  confirmEditTask = (task, updatedTask) => {
    //delete current task from array
    this.deleteTask(task, "currentTasks");
    //add updated task to array
    this.addTask(updatedTask);
    this.fetchData();

    console.log(`editing task ${task} with ${updatedTask} `);
  };

  archiveTask = task => {
    firestore
      .collection("users")
      .doc(this.state.userID)
      .update({
        currentTasks: firebase.firestore.FieldValue.arrayRemove(task),
        completedTasks: firebase.firestore.FieldValue.arrayUnion(task)
      });

    console.log(`task "${task}" archived`);
    this.fetchData();
  };

  unarchiveTask = task => {
    firestore
      .collection("users")
      .doc(this.state.userID)
      .update({
        currentTasks: firebase.firestore.FieldValue.arrayUnion(task),
        completedTasks: firebase.firestore.FieldValue.arrayRemove(task)
      });

    console.log(`task "${task}" unarchived`);
    this.fetchData();
  };

  deleteTask = (task, status) => {
    status === "currentTasks"
      ? firestore
          .collection("users")
          .doc(this.state.userID)
          .update({
            currentTasks: firebase.firestore.FieldValue.arrayRemove(task)
          })
      : firestore
          .collection("users")
          .doc(this.state.userID)
          .update({
            completedTasks: firebase.firestore.FieldValue.arrayRemove(task)
          });

    console.log(`task "${task}" deleted`);
    this.fetchData();
  };

  toggleCompletedVisiblity = () => {
    this.setState({ completedTasksVisible: !this.state.completedTasksVisible });
  };

  toggleCurrentVisibility = () => {
    this.setState({ currentTasksVisible: !this.state.currentTasksVisible });
  };

  render() {
    return (
      <div>
        <main>
          <section>
            <h2>Add A Task!</h2>
            <InputBox
              addTaskText={this.state.addTaskText}
              setAddTaskText={this.setTaskAddText}
            />
            <button onClick={() => this.addTask(this.state.addTaskText)}>
              Add Task
            </button>
          </section>
          {this.state.currentTasksVisible ? (
            <section>
              <button onClick={this.toggleCurrentVisibility}>
                Hide Current Tasks
              </button>
              <h2>Current Tasks</h2>
              <TaskList
                list={this.state.userData.currentTasks}
                archiveTask={this.archiveTask}
                deleteTask={this.deleteTask}
                confirmEditTask={this.confirmEditTask}
              />
            </section>
          ) : (
            <button onClick={this.toggleCurrentVisibility}>
              Show Current Tasks
            </button>
          )}

          {/* {show or hide completed tasks} */}
          {this.state.completedTasksVisible ? (
            <React.Fragment>
              <section>
                <button onClick={this.toggleCompletedVisiblity}>
                  Hide Completed Tasks
                </button>
                <h2>Completed Tasks</h2>
                <TaskList
                  list={this.state.userData.completedTasks}
                  unarchiveTask={this.unarchiveTask}
                  deleteTask={this.deleteTask}
                  confirmEditTask={this.confirmEditTask}
                />
              </section>
            </React.Fragment>
          ) : (
            <button onClick={this.toggleCompletedVisiblity}>
              Show Completed Tasks
            </button>
          )}
        </main>
      </div>
    );
  }
}

export default ToDoContainer;
