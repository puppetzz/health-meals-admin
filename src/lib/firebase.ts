// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDBCJ9eygvJbCxPXExlEtyPG647QoO697s',
  authDomain: 'healthy-meals-24512.firebaseapp.com',
  projectId: 'healthy-meals-24512',
  storageBucket: 'healthy-meals-24512.appspot.com',
  messagingSenderId: '182279618940',
  appId: '1:182279618940:web:25bfed8fc410c2a7a424f9',
  measurementId: 'G-0ND9MKEDDT',
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    GoogleAuthProvider.credentialFromResult(result);
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUser = async () => {
  return new Promise<User | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

export const getIdToken = async () => {
  const user = await getCurrentUser();
  return await user?.getIdToken();
};

export const firebaseSignOut = async () => {
  await auth.signOut();
};
