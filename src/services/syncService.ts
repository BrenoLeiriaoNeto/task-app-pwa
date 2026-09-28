import {localDb} from "../storage/indexedDb/dexieConfig.ts";
import {taskCloudService} from "./cloud/taskCloudService.ts";
import {logTasksPullSynced, logTasksPushSynced} from "../storage/firebase/analyticsService.ts";

export const pushSyncToFirestore = async (): Promise<void> => {
    const pendingTasks = await localDb.tasks.filter(
        t => !t.synced
    ).toArray();

    if (pendingTasks.length === 0) return;

    for (const task of pendingTasks) {
        try {
            await taskCloudService.pushTaskToCloud(task);
            await localDb.tasks.update(task.id, {synced: true});
        } catch (error) {
            console.error(`Falha ao realizar o Push Sync da tarefa ${task.id}:`, error);
        }
    }
    logTasksPushSynced(pendingTasks.length);
}

export const pullSyncFromFirestore = async (userId: string): Promise<void> => {
    try {
        const cloudTasks = await taskCloudService.pullTasksFromCloud(userId);

        if (cloudTasks.length === 0) return;

        await localDb.tasks.bulkPut(cloudTasks);

        logTasksPullSynced(cloudTasks.length);

    } catch (error) {
        console.error('❌ Erro ao realizar o Pull Sync:', error);
    }
}