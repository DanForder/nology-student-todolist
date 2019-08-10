import React, { Component } from "react";
import "./App.scss";
import ToDoContainer from "./containers/ToDoContainer/ToDoContainer";
import firebase, { provider, firestore } from "./firebase";

class App extends Component {
  state = {
    user: null
  };

  //ya29.GltgB-3CK86bw3zp_FaHI2vWDUtp-mljYqscTSVFLY8HNBaA6e6KdMfzGW960dxxji_HH6QQHO4IqZ7DHbnp53aPX25PYrRt9JloAZ9oYUhLRiuGWNc1-Bzytk2r
  //ya29.GltgB1nTCtK3P2N884o2eJL_a2K6eMCMJvkY1jQbAJesa17uuOzfSApqAJFYMadQ_ZJSAliuEzdnOJEoCCmMVWWVzGyzGs5qDevzRgV9dCmGW3E3vSH9ZzurARqn

  signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        this.setState({
          user
        });
        // console.log(this.state.user.uid);
        this.createUserDatabase(user.uid);
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  };

  createUserDatabase = userToken => {
    firestore
      .collection("users")
      .doc(userToken)
      .set({
        test: "hello",
        test2: "hello again!"
      });
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1 onClick={() => this.setState({ user: "hello" })}>
            Oh What... To Do?
          </h1>
          <div>
            <button onClick={this.signIn}>Sign In With Google</button>
          </div>
        </header>
        <ToDoContainer user={this.state.user} />
      </div>
    );
  }
}

export default App;
