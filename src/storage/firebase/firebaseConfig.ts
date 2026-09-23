import { initializeApp } from "firebase/app";
import { getAnalytics, type Analytics, isSupported, logEvent } from "firebase/analytics";
import { initializeFirestore, memoryLocalCache } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAaHbMb-buqa48fwqJmjr18QegYAp31O4c",
    authDomain: "task-app-pwa.firebaseapp.com",
    projectId: "task-app-pwa",
    storageBucket: "task-app-pwa.firebasestorage.app",
    messagingSenderId: "665052564535",
    appId: "1:665052564535:web:67e7db19f03230119cc3b2",
    measurementId: "G-55TN18J924"
}

const firebaseApp = initializeApp(firebaseConfig);
const db = initializeFirestore(firebaseApp, {
    localCache: memoryLocalCache()
});

let analytics: Analytics | null = null;

isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(firebaseApp);
    }
});

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (analytics) {
        logEvent(analytics, eventName, eventParams);
    } else {
        console.log(`[Analytics Dev Mode]: ${eventName}`, eventParams);
    }
}

export { firebaseApp, analytics, db };