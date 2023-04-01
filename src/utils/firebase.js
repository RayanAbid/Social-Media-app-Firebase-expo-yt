// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO:YOUR_KEY,
// https:YOUR_KEY,

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiMbkjJW8PPDBJEuUtnhnhDmt1t3i6C2Y",
  authDomain: "social-media-d43d2.firebaseapp.com",
  projectId: "social-media-d43d2",
  storageBucket: "social-media-d43d2.appspot.com",
  messagingSenderId: "225537058077",
  appId: "1:225537058077:web:c2ab09463e5df72189edf4",
  measurementId: "G-DW6PT9TH5V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
