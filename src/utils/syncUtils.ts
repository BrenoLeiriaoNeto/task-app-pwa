export async function triggerBackgroundSync() {
    if (!('serviceWorker' in navigator)) return;

    try {
        const registration = await navigator.serviceWorker.ready;

         if ('sync' in registration) {
            await (registration as any).sync.register('sync-tasks');
            console.log('🔄 Sincronização em background registrada via API nativa.');

        } else if (registration.active) {
            registration.active.postMessage({ type: 'SYNC_TASKS' });
            console.log('🔄 Sincronização disparada via postMessage (Fallback).');
        }

    } catch (error) {
        console.error('❌ Erro ao tentar acionar o Service Worker:', error);
    }
}