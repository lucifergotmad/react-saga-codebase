// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDjEDjYM0CqS3bFi5R9s7YmVU0Lw_N9x9U',
  authDomain: 'shoes-c7400.firebaseapp.com',
  projectId: 'shoes-c7400',
  storageBucket: 'shoes-c7400.appspot.com',
  messagingSenderId: '1044832165463',
  appId: '1:1044832165463:web:9272a9f34a7f23d7a5cd12',
  measurementId: 'G-E7DCCNDGVT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
