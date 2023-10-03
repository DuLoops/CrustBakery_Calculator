// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-OpWd_5sKAf6-22K19mewFouHAY1YoWs",
  authDomain: "crustbakery-2d06d.firebaseapp.com",
  projectId: "crustbakery-2d06d",
  storageBucket: "crustbakery-2d06d.appspot.com",
  messagingSenderId: "238670873782",
  appId: "1:238670873782:web:05c9cac1f9ad2e59381217",
  measurementId: "G-KKDVPKNYGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);