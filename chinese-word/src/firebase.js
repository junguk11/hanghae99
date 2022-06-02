// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuymVcHmym5h5PdvUTgooCk0zq-5saiIU",
  authDomain: "junguk-react-basic.firebaseapp.com",
  projectId: "junguk-react-basic",
  storageBucket: "junguk-react-basic.appspot.com",
  messagingSenderId: "1055781010753",
  appId: "1:1055781010753:web:163b2434964c36c4a9b5c0",
  measurementId: "G-CHJNLWCQNF",
};
initializeApp(firebaseConfig);
// Initialize Firebase

export const db = getFirestore();
