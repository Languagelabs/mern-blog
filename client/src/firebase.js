// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sahan-mern-blog.firebaseapp.com",
  projectId: "sahan-mern-blog",
  storageBucket: "sahan-mern-blog.appspot.com",
  messagingSenderId: "926409888249",
  appId: "1:926409888249:web:4d9c6cf224cd213fd1ad28"
};
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);