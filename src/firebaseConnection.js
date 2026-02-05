import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyBGQPYPiyJQn_V0LXpv83zlbDF04zknrBc",

  authDomain: "projlogin-6c6ff.firebaseapp.com",

  projectId: "projlogin-6c6ff",

  storageBucket: "projlogin-6c6ff.firebasestorage.app",

  messagingSenderId: "892050981978",

  appId: "1:892050981978:web:e25a8fee57d6d67661c463",

  measurementId: "G-6G3HTE3FYY"

};


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export { auth };