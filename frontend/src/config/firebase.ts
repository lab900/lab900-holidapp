// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEwjXYGUaBIb6pi6xNK7kNOZfb2uzjOMI",
    authDomain: "lab900-holidapp.firebaseapp.com",
    projectId: "lab900-holidapp",
    storageBucket: "lab900-holidapp.appspot.com",
    messagingSenderId: "265978120881",
    appId: "1:265978120881:web:b4f0837acb5879e111f090",
    measurementId: "G-KR6VXCJ0P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();