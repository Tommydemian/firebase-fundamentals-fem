// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore"
import {getAuth, connectAuthEmulator} from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-_Kyc-QPbaCN1AaMmegyTWeKV3-euZ6o",
  authDomain: "fundamentals-fem.firebaseapp.com",
  projectId: "fundamentals-fem",
  storageBucket: "fundamentals-fem.appspot.com",
  messagingSenderId: "191101033710",
  appId: "1:191101033710:web:72eceeacfa6694020a67ff",
  measurementId: "G-ZNNJG4TTVB"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
// const analytics = getAnalytics(app);

if (location.hostname ===  'localhost') {
  connectAuthEmulator(FIREBASE_AUTH, 'http://localhost:9099')
  connectFirestoreEmulator(FIRESTORE, 'localhost', 8080)
}
