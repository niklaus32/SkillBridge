// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACIFH5uEVhKRznjWn9XmuaZCOyWgV-zLY",
  authDomain: "skillbridge-90f4e.firebaseapp.com",
  projectId: "skillbridge-90f4e",
  storageBucket: "skillbridge-90f4e.firebasestorage.app",
  messagingSenderId: "427170028805",
  appId: "1:427170028805:web:e1e73f95bc740a97b26b6c",
  measurementId: "G-E6PP0XY06T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);