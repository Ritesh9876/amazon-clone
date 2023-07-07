// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVOPSTGprqz5SyrQbW8vXY2n3p1TOQOds",
  authDomain: "updated--clone-299c2.firebaseapp.com",
  projectId: "updated--clone-299c2",
  storageBucket: "updated--clone-299c2.appspot.com",
  messagingSenderId: "215901653346",
  appId: "1:215901653346:web:b325918a6a9d6849be843b",
  measurementId: "G-X2L5ZHTSD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app)
export {db,auth}