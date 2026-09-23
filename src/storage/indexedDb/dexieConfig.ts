import Dexie, { type Table } from 'dexie';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed';
}

export class TriDoDatabase extends Dexie {
    users!: Table<User>;
    tasks!: Table<Task>;

    constructor() {
        super('TriDoLocalDB');

        this.version(1).stores({
            users: 'id, &email',
            tasks: 'id, status'
        });
    }
}

export const localDb = new TriDoDatabase();