
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsPBLIqnf_7nvWNQkm4aBDtfyYUCseaps",
  authDomain: "dmi-u2p.firebaseapp.com",
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