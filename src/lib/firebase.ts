
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "petlink-zcjw4",
  "appId": "1:684633451503:web:364a29f9b16d6ea8f2a41a",
  "storageBucket": "petlink-zcjw4.firebasestorage.app",
  "apiKey": "AIzaSyCp9qcUCXtNAdTPDia2Af6rNA66gLt7M-0",
  "authDomain": "petlink-zcjw4.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "684633451503"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
