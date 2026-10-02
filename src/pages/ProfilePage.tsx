import { Block, Button, Link, Navbar, Page } from "konsta/react";
import { useLiveQuery } from "dexie-react-hooks";
import { taskService } from "../services/local/taskService.ts";
import { TaskStatus } from "../storage/indexedDb/dexieConfig.ts";
import { ThemeToggle } from "../components/ThemeToggle.tsx";
import { logoutCloudUser } from "../services/cloud/authCloudService.ts";
import { auth } from "../storage/firebase/firebaseConfig.ts";

interface ProfilePageProps {
    userId: string;
    onBack: () => void;
}

export default function ProfilePage({ userId, onBack }: ProfilePageProps) {
    const userEmail = auth.currentUser?.email || "Não informado";

    const allTasks = useLiveQuery(
        () => taskService.getAllTasks(userId),
        [userId]
    ) || [];

    const completedCount = allTasks.filter(
        (task) => task.status === TaskStatus.COMPLETED
    ).length;

    const pendingCount = allTasks.filter(
        (task) => task.status === TaskStatus.PENDING
    ).length;

    const deletedCount = allTasks.filter(
        (task) => task.status === TaskStatus.DELETED
    ).length;

    const handleLogout = async () => {
        await logoutCloudUser();
    };

    return (
        <Page className="relative bg-zinc-100 dark:bg-neutral-900 text-zinc-900 dark:text-white min-h-screen">
            <Navbar
                title="Perfil"
                left={
                    <Link
                        onClick={onBack}
                        className="text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer"
                    >
                        Voltar
                    </Link>
                }
                right={
                    <div>
                        <ThemeToggle />
                    </div>
                }
            />

            <div className="max-w-md mx-auto px-4 py-6 space-y-6">
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                E-mail da conta
                            </p>
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                {userEmail}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                        Resumo de Tarefas
                    </h2>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-center">
                            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 block">
                                {pendingCount}
                            </span>
                            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                Pendentes
                            </span>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-center">
                            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 block">
                                {completedCount}
                            </span>
                            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                Concluídas
                            </span>
                        </div>

                        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-center">
                            <span className="text-2xl font-bold text-red-600 dark:text-red-400 block">
                                {deletedCount}
                            </span>
                            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                Deletadas
                            </span>
                        </div>
                    </div>
                </div>
                <Block className="px-0! py-0! my-0!">
                    <Button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium shadow-xs"
                    >
                        Sair da Conta
                    </Button>
                </Block>
            </div>
        </Page>
    );
}
