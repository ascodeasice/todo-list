import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAS8edv-IMiN_-0cmWTVJ50CxBUzxZtWvY",
  authDomain: "todo-list-6452b.firebaseapp.com",
  projectId: "todo-list-6452b",
  storageBucket: "todo-list-6452b.appspot.com",
  messagingSenderId: "1069815548497",
  appId: "1:1069815548497:web:d07d1ab376e917d4928670"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function signIn() {
  if (getAuth().currentUser !== null) {
    return;
  }
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
  signOut(getAuth()).then(() => {
    console.log('signed out');
  });
}

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

export { app, auth, signIn, signOutUser };
