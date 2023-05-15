// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwjPCmpiC57b71W6ttB3Kdqh4bXokVdJw",
    authDomain: "spotistory.firebaseapp.com",
    projectId: "spotistory",
    storageBucket: "spotistory.appspot.com",
    messagingSenderId: "888123258857",
    appId: "1:888123258857:web:d85f7848bb52b79febfd78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore();
export const storage = getStorage(app);
