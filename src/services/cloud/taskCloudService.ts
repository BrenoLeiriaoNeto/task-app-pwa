import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import type {Task} from "../../storage/indexedDb/dexieConfig.ts";
import {db} from "../../storage/firebase/firebaseConfig.ts";

export const upsertCloudTask = async (task: Task) => {
    const taskRef = doc(db, "tasks", task.id);

    const { synced, ...cloudTaskData } = task;

    await setDoc(taskRef, cloudTaskData, { merge: true });
};

export const deleteCloudTask = async (taskId: string) => {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
}