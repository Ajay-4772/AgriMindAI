import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDmHBbVP9fWdTaEenf394AEJ7L878uFs04",
  authDomain: "agrimindai-4772m.firebaseapp.com",
  projectId: "agrimindai-4772m",
  storageBucket: "agrimindai-4772m.firebasestorage.app",
  messagingSenderId: "640104346784",
  appId: "1:640104346784:web:c6fd4af507b69296a845c5",
  measurementId: "G-C9GEMQ1BM0"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics dynamically (only on client side and if supported)
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

export { app };
