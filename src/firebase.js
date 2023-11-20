// import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {
  doc,
  onSnapshot,
  query,
  where,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdLJ5ZbTfUcmgZrTSd0ESv6UO7IGt_4_k",
  authDomain: "react-linked-in-6fd31.firebaseapp.com",
  databaseURL: "https://react-linked-in-6fd31-default-rtdb.firebaseio.com",
  projectId: "react-linked-in-6fd31",
  storageBucket: "react-linked-in-6fd31.appspot.com",
  messagingSenderId: "963815964218",
  appId: "1:963815964218:web:84282d3de8401010d87f03",
  measurementId: "G-BW8XJKRQ1R"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// console.log("analytics", analytics);
const db = getFirestore();
const auth = getAuth(app);

export { db, auth };
