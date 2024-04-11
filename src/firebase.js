// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDxIP1xd7G948YMVJyyU6Zy7LiVQhC6sd8',
  authDomain: 'toyproject1-433ac.firebaseapp.com',
  projectId: 'toyproject1-433ac',
  storageBucket: 'toyproject1-433ac.appspot.com',
  messagingSenderId: '325363215259',
  appId: '1:325363215259:web:131e0f450649bf58938f3e',
  measurementId: 'G-Y9LQ95FK6X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
