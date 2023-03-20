// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO:YOUR_KEY,
// https:YOUR_KEY,

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: YOUR_KEY,
  authDomain: YOUR_KEY,
  projectId: YOUR_KEY,
  storageBucket: YOUR_KEY,
  messagingSenderId: YOUR_KEY,
  appId: YOUR_KEY,
  measurementId: YOUR_KEY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
