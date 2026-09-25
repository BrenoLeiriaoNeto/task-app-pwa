import {useEffect, useState} from "react";
import {triggerBackgroundSync} from "../utils/syncUtils.ts";
import {pullSyncFromFirestore} from "../services/syncService.ts";

export function useNetworkSync(userId?: string) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const runSyncProcess = async () => {
            try {
                await triggerBackgroundSync();

                if (userId)
                    await pullSyncFromFirestore(userId);
            } catch (error) {
                console.error('Erro durante o processo de sincronização:', error);
            }
        };

        const handleOnline = () => {
            setIsOnline(true);

            runSyncProcess();
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [userId]);

    return { isOnline };
}