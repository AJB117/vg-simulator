import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig.js";
import "firebase/firestore";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
