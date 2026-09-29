import { Button, Block } from "konsta/react";
import { usePWAInstall } from "../hooks/usePWAInstall";

export function PWAInstallBanner() {
  const { isInstallable, installPWA, dismissPrompt } = usePWAInstall();

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
                <Block className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 p-4 m-0 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <img
                            src="/Logo-light-512px.png"
                            alt="Task App Logo"
                            className="w-12 h-12 rounded-xl border border-zinc-100 dark:border-zinc-700"
                        />
                        <div>
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                                Instalar TaskApp
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Adicione à tela inicial para uso rápido e suporte offline.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-1">
                        <Button tonal rounded onClick={dismissPrompt} className="flex-1 text-sm font-medium">
                            Agora Não
                        </Button>
                        <Button rounded onClick={installPWA} className="flex-1 text-sm font-medium">
                            Instalar
                        </Button>
                    </div>
                </Block>
            </div>
  )
}
