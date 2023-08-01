// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgXSmns3TmSMNcPfMbh_eAyG5TQfP1qMY",
  authDomain: "monkeymind-cf1d8.firebaseapp.com",
  projectId: "monkeymind-cf1d8",
  storageBucket: "monkeymind-cf1d8.appspot.com",
  messagingSenderId: "536612283767",
  appId: "1:536612283767:web:10eaa5edff2d3e7aa06d72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// create a database with the app config above
export const db = getFirestore(app);

// create a collection from db, named tasks
export const tasksCollection = collection(db, "tasks");
