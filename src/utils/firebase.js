// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO:YOUR_KEY,
// https:YOUR_KEY,

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// apiKey: "AIzaSyDiMbkjJW8PPDBJEuUtnhnhDmt1t3i6C2Y",
// authDomain: "social-media-d43d2.firebaseapp.com",
// projectId: "social-media-d43d2",
// storageBucket: "social-media-d43d2.appspot.com",
// messagingSenderId: "225537058077",
// appId: "1:225537058077:web:c2ab09463e5df72189edf4",
// measurementId: "G-DW6PT9TH5V",
const firebaseConfig = {
  apiKey: "AIzaSyDwVcUHqsKLPKm4VJhCc9eF_cQlV2MOOJw",
  authDomain: "fit-club-c8cde.firebaseapp.com",
  projectId: "fit-club-c8cde",
  storageBucket: "fit-club-c8cde.appspot.com",
  messagingSenderId: "534008076009",
  appId: "1:534008076009:web:49a13f9962b83666954278",
  measurementId: "G-YLVM83WDZZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
