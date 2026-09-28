import Dexie, { type Table } from 'dexie';

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  DELETED = 'deleted',
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    updated_at: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    userId: string;
    synced: boolean;
    created_at: string;
    updated_at: string;
}

export class TriDoDatabase extends Dexie {
    users!: Table<User>;
    tasks!: Table<Task>;

    constructor() {
        super('TriDoLocalDB');

        this.version(3).stores({
            users: 'id, &email, updated_at',
            tasks: 'id, status, userId, synced, created_at, updated_at'
        });
    }
}

export const localDb = new TriDoDatabase();
