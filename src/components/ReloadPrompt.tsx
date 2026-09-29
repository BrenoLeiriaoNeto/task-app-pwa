import { useRegisterSW } from 'virtual:pwa-register/react';
import {Block, Button} from "konsta/react";

export function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(r) {
            console.log('[PWA] Service Worker registrado com sucesso:', r);
        },
        onRegisterError(error) {
            console.error('[PWA] Erro ao registrar Service Worker:', error);
        }
    });

    const closePrompt = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    }

    if (!offlineReady && !needRefresh) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <Block className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 p-4 m-0 flex flex-col gap-3">
                <div className="text-sm font-medium text-zinc-900 dark:text-white">
                    {offlineReady
                        ? 'O aplicativo está pronto para funcionar offline!'
                        : 'Nova versão disponível! Clique abaixo para atualizar.'}
                </div>
                <div className="flex gap-2 mt-1">
                    {needRefresh && (
                        <Button
                            rounded
                            onClick={() => updateServiceWorker(true)}
                            className="flex-1 text-sm bg-emerald-600 font-medium"
                        >
                            Atualizar App
                        </Button>
                    )}
                    <Button tonal rounded onClick={closePrompt} className="flex-1 text-sm font-medium">
                        Fechar
                    </Button>
                </div>
            </Block>
        </div>
    )
}