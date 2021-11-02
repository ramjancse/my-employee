import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "firebase/firestore";
import "firebase/storage"; // <----
require("firebase/firestore");

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA12D0sMB-lBXUKMlw7qFu-6AO9F4DrZ1A",
  authDomain: "employee-7ce2a.firebaseapp.com",
  projectId: "employee-7ce2a",
  storageBucket: "employee-7ce2a.appspot.com",
  messagingSenderId: "346125064372",
  appId: "1:346125064372:web:2bc9629fc84a130a8d1fe1",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

