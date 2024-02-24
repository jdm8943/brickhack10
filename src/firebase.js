// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvsrgc09GqGD8y3a3H3G0xEdtx7vxF5Fg",
  authDomain: "brickhack10.firebaseapp.com",
  projectId: "brickhack10",
  storageBucket: "brickhack10.appspot.com",
  messagingSenderId: "1090128869892",
  appId: "1:1090128869892:web:cc063de784b73b2842d351",
  measurementId: "G-4J4WL8FHTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {auth, app, db};