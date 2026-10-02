import {localDb, type Task, TaskStatus} from "../../storage/indexedDb/dexieConfig.ts";
import {
    logTaskCreated,
    logTaskDeleted,
    logTaskStatusToggled,
    logTaskUpdated
} from "../../storage/firebase/analyticsService.ts";
import {pushSyncToFirestore} from "../syncService.ts";

export const taskService = {

    async createTask(task: Omit<Task, 'id' | 'synced' | 'created_at' | 'updated_at'>) {
        const newTask: Task = {
            ...task,
            id: crypto.randomUUID(),
            synced: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        await localDb.tasks.add(newTask);
        if (navigator.onLine) await pushSyncToFirestore();

        logTaskCreated(task.status);
        return newTask;
    },

    async toggleTaskStatus(taskId: string, currentStatus: TaskStatus): Promise<void> {
        const newStatus = currentStatus === TaskStatus.COMPLETED
        ? TaskStatus.PENDING : TaskStatus.COMPLETED;

        await localDb.tasks.update(taskId, {
            status: newStatus,
            synced: false,
            updated_at: new Date().toISOString(),
        });

        if (navigator.onLine) await pushSyncToFirestore();

        logTaskStatusToggled(newStatus);
    },

    async updateTask(taskId: string, updates: {
        title: string; description?: string; dueDate?: string;
    }): Promise<void> {
        await localDb.tasks.update(taskId, {
            ...updates,
            synced: false,
            updated_at: new Date().toISOString(),
        });
        if (navigator.onLine) await pushSyncToFirestore();

        logTaskUpdated();
    },

    async softDelete(taskId: string): Promise<void> {
        await localDb.tasks.update(taskId, {
            status: TaskStatus.DELETED,
            synced: false,
            updated_at: new Date().toISOString(),
        });

        if (navigator.onLine) await pushSyncToFirestore();

        logTaskDeleted();
    },

    async getTaskById(taskId: string): Promise<Task | undefined> {
        return await localDb.tasks.get(taskId);
    },

    async getAllActiveTasks(userId: string): Promise<Task[]> {
        return await localDb.tasks
            .where('userId')
            .equals(userId)
            .filter(task => task.status !== TaskStatus.DELETED)
            .reverse()
            .sortBy('created_at');
    },

    async getAllTasks(userId: string): Promise<Task[]> {
        return await localDb.tasks
            .where('userId')
            .equals(userId)
            .toArray();
    }
};