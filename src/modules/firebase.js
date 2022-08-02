import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import defaultProfile from '../assets/profile.svg';

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

const userName = document.getElementById('userName');
const profileImg = document.getElementById('profileImg');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

async function signIn() {
  if (isUserSignedIn()) {
    return;
  }
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
  signOut(getAuth());
}

// Returns the signed-in user's display name.
function getUserName() {
  if (isUserSignedIn()) {
    return getAuth().currentUser.displayName;
  } else {
    return 'Sign in to save your edit';
  }
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return getAuth().currentUser !== null;
}

function getUserPhotoUrl() {
  return isUserSignedIn() ? getAuth().currentUser.photoURL : defaultProfile;
}

function updateProfile() {
  if (isUserSignedIn()) {
    signInBtn.style.display = 'none';
    signOutBtn.style.display = 'block';
  } else {
    signOutBtn.style.display = 'none';
    signInBtn.style.display = 'block';
  }
  profileImg.src = getUserPhotoUrl();
  userName.innerText = getUserName();
}

export { app, auth, signIn, signOutUser, isUserSignedIn, updateProfile };
