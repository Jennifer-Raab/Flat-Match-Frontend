import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA-zePd6BLSb6vAiVGQjYI996x1Akq-Ul0",
  authDomain: "flat-match-b51cb.firebaseapp.com",
  projectId: "flat-match-b51cb",
  storageBucket: "flat-match-b51cb.appspot.com",
  messagingSenderId: "353244370768",
  appId: "1:353244370768:web:2b3f9a0f36f18e997cbe55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
