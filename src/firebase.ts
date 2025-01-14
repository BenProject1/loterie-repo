import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCgb6AcHsddRXxd8Hzxocv0FF-AFnaqBOY",
  authDomain: "bolt-qr-code-320e1.firebaseapp.com",
  projectId: "bolt-qr-code-320e1",
  storageBucket: "bolt-qr-code-320e1.firebasestorage.app",
  messagingSenderId: "861781790507",
  appId: "1:861781790507:web:e4a530dc39b59cbed17f6e",
  measurementId: "G-6QQYGB66T7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Tentative de connexion à Firebase...');

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('✅ Firebase initialisé avec succès !');
console.log('✅ Firestore connecté');
console.log('✅ Authentication prête');

export { app, analytics, auth, db };