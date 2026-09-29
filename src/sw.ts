/// <reference types="vite-plugin-pwa/client" />
/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { localDb } from "./storage/indexedDb/dexieConfig.ts";

declare let self: ServiceWorkerGlobalScope;

interface SyncEvent extends ExtendableEvent {
  readonly tag: string;
  readonly lastChance: boolean;
}

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

try {
    const handler = createHandlerBoundToURL("/index.html");
    const navigationRoute = new NavigationRoute(handler, {
        allowlist: [/^\/$/ , /^\/[a-zA-Z0-9_-]+/],
        denylist: [/^\/api\//, /firebase/],
    });
    registerRoute(navigationRoute);
} catch (error) {
    console.warn('[SW] Fallback de navegação não pôde ser registrado.', error);
}

const firebaseConfig = {
    apiKey: "AIzaSyAaHbMb-buqa48fwqJmjr18QegYAp31O4c",
    authDomain: "task-app-pwa.firebaseapp.com",
    projectId: "task-app-pwa",
    storageBucket: "task-app-pwa.firebasestorage.app",
    messagingSenderId: "665052564535",
    appId: "1:665052564535:web:67e7db19f03230119cc3b2",
    measurementId: "G-55TN18J924"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

async function syncTasksWithFirestore(): Promise<void> {
    try {
        const pendingTasks = await localDb.tasks
            .filter(t => !t.synced)
            .toArray();

        for (const task of pendingTasks) {
            const { synced, ...cloudTaskData } = task;

            await setDoc(doc(firestore, "tasks", task.id), cloudTaskData, {merge: true});

            await localDb.tasks.update(task.id, { synced: true });
        }
    } catch (error) {
        console.error('[SW background Sync falhou]:', error);
    }
}

self.addEventListener('sync', (event: Event) => {
  const syncEvent = event as SyncEvent;
  if (syncEvent.tag === 'sync-tasks') {
    syncEvent.waitUntil(syncTasksWithFirestore());
  }
});

self.addEventListener('message', (event: ExtendableMessageEvent) => {
    if (event.data && event.data.type === 'SYNC_TASKS') {
        event.waitUntil(syncTasksWithFirestore());
    }
});

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim());
});
