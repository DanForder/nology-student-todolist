import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
// import "firebase/auth";

// Basic firebase configuration linking web application to database - see firebase documentation

const firebaseConfig = {
  apiKey: "AIzaSyBRmJr3UTnn-y2kFp4lo6ikzp3nZv_7XWk",
  authDomain: "todolist-51995.firebaseapp.com",
  databaseURL: "https://todolist-51995.firebaseio.com",
  projectId: "todolist-51995",
  storageBucket: "todolist-51995.appspot.com",
  messagingSenderId: "982909443593",
  appId: "1:982909443593:web:9038466135cd2e8e"
};

// Initialising firebase
firebase.initializeApp(firebaseConfig);

// Exporting connection to database as a variable
export const firestore = firebase.firestore();

export default firebase;
