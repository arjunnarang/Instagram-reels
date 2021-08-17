import firebase from "firebase";

let firebaseConfig = {
    apiKey: "AIzaSyD2maSVLKG6NfhwXwMacsuYQmoUHUOyKmg",
    authDomain: "login-app-452d5.firebaseapp.com",
    projectId: "login-app-452d5",
    storageBucket: "login-app-452d5.appspot.com",
    messagingSenderId: "745737678830",
    appId: "1:745737678830:web:ffeb13c5fffcea1147e8ff",
    measurementId: "G-Q0Y7N3FWYP"
  };

let firebaseApp = firebase.initializeApp(firebaseConfig);
export let firebaseAuth = firebase.auth();

export let firebaseStorage = firebase.storage();
export let firebaseDB = firebaseApp.firestore();
export let timeStamp = firebase.firestore.FieldValue.serverTimestamp;