import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIA81X4_Mf1adXDrJ5e_DROCXVAzxd8u4",
  authDomain: "firm-moonlight-385212.firebaseapp.com",
  projectId: "firm-moonlight-385212",
  storageBucket: "firm-moonlight-385212.appspot.com",
  messagingSenderId: "307198491612",
  appId: "1:307198491612:web:bd1b5900c04d4f3a566d19",
  measurementId: "G-HNTTJQT9JJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
