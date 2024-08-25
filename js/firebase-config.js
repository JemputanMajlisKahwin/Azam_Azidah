import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx97x-JufARMMPekWkRGT_6Flfid2DDR8",
  authDomain: "vydamore-ea949.firebaseapp.com",
  databaseURL: "https://vydamore-ea949-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vydamore-ea949",
  storageBucket: "vydamore-ea949.appspot.com",
  messagingSenderId: "363045889390",
  appId: "1:363045889390:web:ade4517744f380e40f8d7f",
  measurementId: "G-0H8E7EQZ9M"
};

  // Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
