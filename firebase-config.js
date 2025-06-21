import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    updateDoc, 
    doc 
} from "https://www.gstatic.com/firebasejs/9.23.0/firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC60kv4QUa_PITSioF59NaThtgmw9zrXlI",
  authDomain: "proto-call-b0cad.firebaseapp.com",
  projectId: "proto-call-b0cad",
  storageBucket: "proto-call-b0cad.firebasestorage.app",
  messagingSenderId: "247066931084",
  appId: "1:247066931084:web:d5de75564ebd9c860eb0a9",
  measurementId: "G-W7550L0V5J"
};

// Initialize Firebase
let db;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

export { db, collection, addDoc, getDocs, updateDoc, doc };
