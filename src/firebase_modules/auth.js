import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import defaultProfile from '../assets/profile.svg';
import { getCollection } from './firestore';


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

async function updateProfile() {
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

function getUserId() {
  if (isUserSignedIn()) {
    return getAuth().currentUser.uid;
  } else {
    throw new Error('Can\'t get id when user\'s not logged in');
  }
}

export { signIn, signOutUser, isUserSignedIn, updateProfile, getUserId };
