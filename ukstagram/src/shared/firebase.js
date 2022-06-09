import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5DcFxu9B5spvta_s4KDpXlnlFGMnrE3Q",
  authDomain: "ukstagram.firebaseapp.com",
  projectId: "ukstagram",
  storageBucket: "ukstagram.appspot.com",
  messagingSenderId: "957846014033",
  appId: "1:957846014033:web:6a269c68775b3cefd9d070",
  measurementId: "G-VGCY660WY4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
// export const apiKey = firebaseConfig.apiKey;

export default app;
