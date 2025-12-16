import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXUQEiH0Ne730fjGreziLIvYNAGAV3uy8",
  authDomain: "frontend-project-390df.firebaseapp.com",
  projectId: "frontend-project-390df",
  storageBucket: "frontend-project-390df.firebasestorage.app",
  messagingSenderId: "489222341030",
  appId: "1:489222341030:web:f369f24ad0a0d9f8504f67",
  measurementId: "G-KPTHF85VB8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);