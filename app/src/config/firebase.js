import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  authDomain: "eventnft-memories.firebaseapp.com",
  projectId: "eventnft-memories",
  storageBucket: "eventnft-memories.appspot.com",
  messagingSenderId: "641804322981",
  appId: "1:641804322981:web:a81a2e735d7b02cc54254c",
  measurementId: "G-EVHE5DTECD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const storage = getStorage(app);
export default storage;
