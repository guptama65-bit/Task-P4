import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoHsYDuh1y6kqh13nHXfgJazoViaY-Ve0",
  authDomain: "dev-deakin-task-p4-440e6.firebaseapp.com",
  projectId: "dev-deakin-task-p4-440e6",
  storageBucket: "dev-deakin-task-p4-440e6.firebasestorage.app",
  messagingSenderId: "839104172426",
  appId: "1:839104172426:web:9164afde1801c91856b873"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);