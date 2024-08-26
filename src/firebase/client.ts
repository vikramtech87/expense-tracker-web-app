import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import { getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const currentApps = getApps();

let app: FirebaseApp | undefined = undefined;

if (currentApps.length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = currentApps[0]
}

const auth = getAuth(app);
const db = getFirestore(app);

// Use emulator in development
if (process.env.NEXT_PUBLIC_APP_ENV === "emulator") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}

export { auth, db };