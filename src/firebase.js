import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDxIP1xd7G948YMVJyyU6Zy7LiVQhC6sd8',
  authDomain: 'toyproject1-433ac.firebaseapp.com',
  projectId: 'toyproject1-433ac',
  storageBucket: 'toyproject1-433ac.appspot.com',
  messagingSenderId: '325363215259',
  appId: '1:325363215259:web:131e0f450649bf58938f3e',
  measurementId: 'G-Y9LQ95FK6X',
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
