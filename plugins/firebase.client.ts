import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
 const firestore = getFirestore(app);

  const isEmulating = window.location.hostname === 'localhost';
  if (isEmulating) {
    const db = getFirestore();
    connectFirestoreEmulator(db, 'localhost', 8080);
  }
});
