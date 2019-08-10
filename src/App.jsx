import React, { Component } from "react";
import "./App.scss";
import ToDoContainer from "./containers/ToDoContainer/ToDoContainer";
import firebase, { provider, firestore } from "./firebase";

//"This domain (todolist.dforder.com) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab."

class App extends Component {
  state = {
    user: null
  };

  signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        this.setState({
          user
        });
        //if one doesn't exist, create new collection with unique user ID
        this.createUserCollection(user.uid);
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  };

  //TODO: pass down userToken reference to database as props
  createUserCollection = userToken => {
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
        <h1 onClick={() => this.setState({ user: "hello" })}>
          Oh What... To Do?
        </h1>

        {/* {check user is logged in and show appropriate display} */}
        {this.state.user ? (
          <ToDoContainer user={this.state.user} />
        ) : (
          <div>
            <p>
              We offer a contemporary solutions to age-old problems with our
              state-of-the-art personal neural network management system. Sign
              up for "Oh What... To Do?" now!
            </p>
            <button onClick={this.signIn}>Sign In With Google</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
