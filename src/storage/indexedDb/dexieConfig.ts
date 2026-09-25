import Dexie, { type Table } from 'dexie';

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
    status: 'pending' | 'completed' | 'deleted';
    userId: string;
    synced: boolean;
    updated_at: string;
}

export class TriDoDatabase extends Dexie {
    users!: Table<User>;
    tasks!: Table<Task>;

    constructor() {
        super('TriDoLocalDB');

        this.version(2).stores({
            users: 'id, &email, updated_at',
            tasks: 'id, status, userId, synced, updated_at'
        });
    }
}

export const localDb = new TriDoDatabase();