
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "<insert data from Firebase>",
  authDomain: "<insert data from Firebase>",
  databaseURL: "<insert data from Firebase>",
  projectId: "<insert data from Firebase>",
  storageBucket: "<insert data from Firebase>",
  messagingSenderId: "<insert data from Firebase>",
  appId: "<insert data from Firebase>",
  measurementId: "<insert data from Firebase>"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const db = firebase.firestore();
