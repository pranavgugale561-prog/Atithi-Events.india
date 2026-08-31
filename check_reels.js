import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "dummy",
  projectId: "atithi-events", 
};

// I need the actual firebase config from firebase.js
