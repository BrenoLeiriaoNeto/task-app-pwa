import {localDb, type Task} from "../../storage/indexedDb/dexieConfig.ts";
import {logTaskCreated, logTaskUpdated} from "../../storage/firebase/analyticsService.ts";
import {upsertCloudTask} from "../cloud/taskCloudService.ts";

export const createTask = async (
    taskData: Partial<Task>
): Promise<void> => {
    const isNewTask = !taskData.id;

    const task: Task = {
        id: taskData.id || crypto.randomUUID(),
        title: taskData.title!,
        description: taskData.description!,
        status: taskData.status || 'pending',
        userId: taskData.userId!,
        synced: false,
        updated_at: new Date().toISOString(),
    };

    if (isNewTask) {
        await localDb.tasks.add(task);
        logTaskCreated();
    } else {
        await localDb.tasks.put(task);
        logTaskUpdated(task.id);
    }

    try {
        await upsertCloudTask(task);

        await localDb.tasks.update(task.id, {synced: true});
    } catch (error) {
        console.log("Sem internet. O service worker sincroniza depois");
    }
};

export const updateTaskStatus = async (
    id: string, status: 'pending' | 'completed' | 'deleted'
): Promise<void> => {
    await localDb.tasks.update(id, {status});
}

export const deleteTask = async (id: string, status: 'deleted'): Promise<void> => {
    await localDb.tasks.update(id, {status});
}