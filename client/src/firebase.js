// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-mern-ba8e3.firebaseapp.com",
  projectId: "real-estate-mern-ba8e3",
  storageBucket: "real-estate-mern-ba8e3.appspot.com",
  messagingSenderId: "1087681010157",
  appId: "1:1087681010157:web:f04401bbefa926d9e8afe4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);