// 'use client';

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyDlXWJCUBI905JUzNQhGdfkVRecURL6EUo",
//   authDomain: "miniapp-9052d.firebaseapp.com",
//   databaseURL: "https://miniapp-9052d-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "miniapp-9052d",
//   storageBucket: "miniapp-9052d.firebasestorage.app",
//   messagingSenderId: "956165747709",
//   appId: "1:956165747709:web:c91bebd61a77260f8e9f94",
//   measurementId: "G-8TS1NW9M1S"
// };

// // Initialize Firebase only on client side
// let app;
// let auth;
// let db;
// let realTimeDb;

// if (typeof window !== 'undefined') {
//   // Initialize Firebase
//   app = initializeApp(firebaseConfig);
//   auth = getAuth(app);
//   db = getFirestore(app);
//   realTimeDb = getDatabase(app);
// }

// export { auth, db, realTimeDb };
// export default app;





'use client';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDlXWJCUBI905JUzNQhGdfkVRecURL6EUo",
  authDomain: "miniapp-9052d.firebaseapp.com",
  databaseURL: "https://miniapp-9052d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "miniapp-9052d",
  storageBucket: "miniapp-9052d.firebasestorage.app",
  messagingSenderId: "956165747709",
  appId: "1:956165747709:web:c91bebd61a77260f8e9f94",
  measurementId: "G-8TS1NW9M1S"
};

// Initialize Firebase only once
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);
const realTimeDb = getDatabase(app);
const functions = getFunctions(app);

export { auth, db, realTimeDb, functions };
export default app;