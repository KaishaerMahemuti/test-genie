import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCR4VO4dUqqWr4wEVoj88VPCEXMjp_AmQw",
    authDomain: "test-genie-client.firebaseapp.com",
    projectId: "test-genie-client",
    storageBucket: "test-genie-client.firebasestorage.app",
    messagingSenderId: "984690410709",
    appId: "1:984690410709:web:62ca00c931677241628e5c",
    measurementId: "G-WXMG41EZ6R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // ⬅️ Firestore instance