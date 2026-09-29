import {doc, setDoc, query, collection, where, getDocs} from 'firebase/firestore';
import {type Task, TaskStatus} from "../../storage/indexedDb/dexieConfig.ts";
import {db} from "../../storage/firebase/firebaseConfig.ts";

export const taskCloudService = {

    async pushTaskToCloud(task: Task): Promise<void> {
        const { synced, ...cloudTaskData } = task;

        await setDoc(doc(db, "tasks", task.id), cloudTaskData, { merge: true });
    },

    async pullTasksFromCloud(userId: string): Promise<Task[]> {
        const q = query(collection(
            db, "tasks"), where("userId", "==", userId)
        );
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                description: data.description,
                status: data.status || TaskStatus.PENDING,
                userId: data.userId,
                created_at: data.created_at,
                updated_at: data.updated_at,
                synced: true
            } as Task;
        })
    }
}