// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8BObCfGOnw8A3g_ZIHv4pBgur6i3URF4",
  authDomain: "smact-realtime-db.firebaseapp.com",
  databaseURL:
    "https://smact-realtime-db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smact-realtime-db",
  storageBucket: "smact-realtime-db.appspot.com",
  messagingSenderId: "291521892571",
  appId: "1:291521892571:web:23cbf4b070b9e9c2ecfcfe",
  measurementId: "G-R1RKGE2NYC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// const analytics = getAnalytics(app);
