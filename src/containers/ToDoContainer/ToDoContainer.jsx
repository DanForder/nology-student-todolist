import React, { Component } from "react";
import firebase, { firestore } from "../../firebase";
import TaskList from "../../components/TaskList/TaskList";
import InputBox from "../../components/InputBox/InputBox";

class ToDoContainer extends Component {
  state = { userData: [], completedTasksVisible: true, searchText: "" };

  componentDidMount() {
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
    console.log("new task added");
    this.setState({ searchText: "" });
  };

  deleteTask = task => {
    const userRef = firestore.collection("users").doc("new user!");
    userRef.update({
      currentTasks: firebase.firestore.FieldValue.delete()
    });
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
          <button onClick={() => this.deleteTask("Get Milk")}>
            Delete All Ongoing Tasks!
          </button>
          <section>
            <h2>Ongoing Tasks</h2>
            {/* {console.log(this.state.userData.currentTasks)} */}
            <TaskList list={this.state.userData.currentTasks} />
          </section>

          {this.state.completedTasksVisible ? (
            <React.Fragment>
              <section>
                <button onClick={this.toggleCompletedVisiblity}>
                  Hide Completed Tasks
                </button>
                <h2>Completed Tasks</h2>
                {/* {console.log(this.state.userData.completedTasks)} */}
                <TaskList list={this.state.userData.completedTasks} />
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
