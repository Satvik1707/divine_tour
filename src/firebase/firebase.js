// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArE3u0Cu9O1N0Gwx6uMXL5ULVFBBDHViQ",
  authDomain: "divine-tour-e79b8.firebaseapp.com",
  databaseURL: "https://divine-tour-e79b8-default-rtdb.firebaseio.com",
  projectId: "divine-tour-e79b8",
  storageBucket: "divine-tour-e79b8.appspot.com",
  messagingSenderId: "691853524175",
  appId: "1:691853524175:web:df28b5dbc438c795e70bba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
export const storage = getStorage(app);
