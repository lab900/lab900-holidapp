import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAEwjXYGUaBIb6pi6xNK7kNOZfb2uzjOMI",
  authDomain: "lab900-holidapp.firebaseapp.com",
  projectId: "lab900-holidapp",
  storageBucket: "lab900-holidapp.appspot.com",
  messagingSenderId: "265978120881",
  appId: "1:265978120881:web:b4f0837acb5879e111f090",
  measurementId: "G-KR6VXCJ0P4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    googleProvider.addScope("https://www.googleapis.com/auth/calendar.events");
    await signInWithPopup(auth, googleProvider);
  } catch (err: any) {
    console.error(err);
    alert(err?.message ?? "An error occured while signing in");
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signInWithGoogle, logout };
