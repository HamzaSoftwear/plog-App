// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyD9VK-PrWfzD4r0WFrdtMQD49nJUdj7ceI",
  authDomain: "plog-app-ec1be.firebaseapp.com",
  projectId: "plog-app-ec1be",
  storageBucket: "plog-app-ec1be.firebasestorage.app",
  messagingSenderId: "982225596845",
  appId: "1:982225596845:web:7c5518327036068ed37124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// creat auth
const auth = getAuth(app);

export { app, auth };
