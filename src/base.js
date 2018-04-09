var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCeYy_Wpe0iTF9LLoGjyRcn6eHaOXF_uWk",
  authDomain: "cs252-lab6-acece.firebaseapp.com",
  databaseURL: "https://cs252-lab6-acece.firebaseio.com",
  projectId: "cs252-lab6-acece",
  storageBucket: "",
  messagingSenderId: "931732945774"
};
firebase.initializeApp(config);

export const fireauth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;