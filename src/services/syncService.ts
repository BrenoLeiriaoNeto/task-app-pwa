import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import {localDb, type Task} from "../storage/indexedDb/dexieConfig.ts";
import {db} from "../storage/firebase/firebaseConfig.ts";

export const pullSyncFromFirestore = async (userId: string) => {
    try {
        const lastLocalTask = await localDb.tasks
            .orderBy('updated_at')
            .reverse()
            .first();

        const lastSyncTime = lastLocalTask ? lastLocalTask.updated_at : 0;

        const tasksRef = collection(db, 'tasks');
        const q = query(
            tasksRef,
            where('userId', '==', userId),
            where('updated_at', '>', lastSyncTime),
            orderBy('updated_at', 'asc')
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log('✅ Tudo atualizado! Nenhuma nova alteração no Firestore.');
            return;
        }

        const tasksToUpdate: Task[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tasksToUpdate.push({
                id: doc.id,
                title: data.title,
                description: data.description,
                status: data.status,
                userId: data.userId,
                updated_at: data.updated_at,
                synced: true
            });
        });

        await localDb.tasks.bulkPut(tasksToUpdate);

        console.log(`🔄 Pull Sync concluído: ${tasksToUpdate.length} tarefas atualizadas.`);
    } catch (error) {
        console.error('❌ Erro ao realizar o Pull Sync:', error);
    }
}