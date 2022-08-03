import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAS8edv-IMiN_-0cmWTVJ50CxBUzxZtWvY",
  authDomain: "todo-list-6452b.firebaseapp.com",
  projectId: "todo-list-6452b",
  storageBucket: "todo-list-6452b.appspot.com",
  messagingSenderId: "1069815548497",
  appId: "1:1069815548497:web:d07d1ab376e917d4928670"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
