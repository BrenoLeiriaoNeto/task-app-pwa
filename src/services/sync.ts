export async function triggerBackgroundSync() {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;

        if ('sync' in registration) {
            try {
                await (registration as any).sync.register('sync-tasks');
            } catch (err) {
                registration.active?.postMessage({ type: 'SYNC_TASKS' });
            }
        } else {
            registration.active?.postMessage({ type: 'SYNC_TASKS' });
        }
    }
}