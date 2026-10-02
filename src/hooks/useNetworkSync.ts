import {useCallback, useEffect, useState} from "react";
import {pullSyncFromFirestore, pushSyncToFirestore} from "../services/syncService.ts";

export function useNetworkSync(userId?: string) {
  const [isOnline, setIsOnline] = useState<boolean>(
      typeof navigator !== 'undefined' ? navigator.onLine : true
    );
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const runSyncProcess = useCallback(async () => {
    if (!navigator.onLine) return;

    setIsSyncing(true);

    try {
      await pushSyncToFirestore();

      if (userId) {
        await pullSyncFromFirestore(userId);
      }
    } catch (error) {
      console.error('[useNetworkAsync] Erro durante o processo de sincronização:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [userId]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      runSyncProcess();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (navigator.onLine) {
      runSyncProcess();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    }
  }, [runSyncProcess])

    return { isOnline, isSyncing, syncNow: runSyncProcess };
}
