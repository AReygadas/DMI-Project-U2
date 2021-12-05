
import * as firebase from "firebase";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCsPBLIqnf_7nvWNQkm4aBDtfyYUCseaps",
  authDomain: "dmi-u2p.firebaseapp.com",
  databaseURL: "https://dmi-u2p-default-rtdb.firebaseio.com",
  projectId: "dmi-u2p",
  storageBucket: "dmi-u2p.appspot.com",
  messagingSenderId: "858332588715",
  appId: "1:858332588715:web:5cd71499f401dd871ea5ee",
  measurementId: "G-KDCYDBTYTW"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const fd = firebase.firestore();
const db = firebase.database();
const st = firebase.storage();

export { auth,fd,db,st};