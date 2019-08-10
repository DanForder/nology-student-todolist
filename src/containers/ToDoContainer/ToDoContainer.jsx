import React, { Component } from "react";
import firebase, { firestore } from "../../firebase";
import TaskList from "../../components/TaskList/TaskList";
import InputBox from "../../components/InputBox/InputBox";

class ToDoContainer extends Component {
  state = { userData: [], completedTasksVisible: true, searchText: "" };

  fetchData() {
    firestore
      .collection("users")
      .get()
      .then(querySnapshot => {
        const userData = querySnapshot.docs.map(data => {
          return { ...data.data(), docId: data.id };
        });
        this.setState({ userData: userData[1] });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  setSearchText = event => {
    const searchText = event.target.value;
    console.log(searchText);
    this.setState({ searchText: searchText });
  };

  //TODO: needs to rerender on add or delete task!

  addTask = task => {
    firestore
      .collection("users")
      .doc("new user!")
      .update({
        currentTasks: firebase.firestore.FieldValue.arrayUnion(task)
      });

    console.log(`task "${task}" added`);
    this.fetchData();

    this.setState({ searchText: "" });
  };

  editTask = task => {
    this.fetchData();
    console.log("editing task " + task);
  };

  archiveTask = task => {
    firestore
      .collection("users")
      .doc("new user!")
      .update({
        currentTasks: firebase.firestore.FieldValue.arrayRemove(task),
        completedTasks: firebase.firestore.FieldValue.arrayUnion(task)
      });

    console.log(`task "${task}" archived`);
    this.fetchData();
  };

  deleteTask = task => {
    firestore
      .collection("users")
      .doc("new user!")
      .update({
        completedTasks: firebase.firestore.FieldValue.arrayRemove(task)
      });

    console.log(`task "${task}" deleted`);
    this.fetchData();
  };

  toggleCompletedVisiblity = () => {
    this.setState({ completedTasksVisible: !this.state.completedTasksVisible });
  };

  render() {
    return (
      <div>
        <header>
          <h1>Oh What... To Do?</h1>
        </header>
        <main>
          <section>
            <h2>Add A Task!</h2>
            <InputBox
              searchText={this.state.searchText}
              setSearchText={this.setSearchText}
            />
            <button onClick={() => this.addTask(this.state.searchText)}>
              Add Task
            </button>
          </section>
          <section>
            <h2>Ongoing Tasks</h2>
            <TaskList
              list={this.state.userData.currentTasks}
              archiveTask={this.archiveTask}
              editTask={this.editTask}
            />
          </section>
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
                  deleteTask={this.deleteTask}
                  editTask={this.editTask}
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
