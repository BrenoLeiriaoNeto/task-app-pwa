import {localDb, type Task} from "../storage/indexedDb/dexieConfig.ts";

export const createTask = async (
    title: string, description: string
): Promise<void> => {
    const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        description,
        status: 'pending',
    };

    await localDb.tasks.add(newTask);
};

export const updateTaskStatus = async (
    id: string, status: 'pending' | 'completed'
): Promise<void> => {
    await localDb.tasks.update(id, {status});
}

export const deleteTask = async (id: string): Promise<void> => {
    await localDb.tasks.delete(id);
}