import { trackEvent } from './firebaseConfig';
import type {TaskStatus} from "../indexedDb/dexieConfig.ts";

export const logNewUserRegistered = (userId: string) => {
    trackEvent('new_user_registered', {
        userId: userId,
    });
};

export const logUserLogin = (userId: string) => {
    trackEvent('user_login', {
        userId: userId,
    });
};

export const logTaskCreated = (taskStatus: TaskStatus) => {
    trackEvent('task_created', {
        status: taskStatus,
    });
};

export const logTaskUpdated = () => {
    trackEvent("task_updated");
};

export const logTaskStatusToggled = (newStatus: TaskStatus) => {
    trackEvent("task_status_toggled", {
        new_status: newStatus,
    });
};

export const logTaskDeleted = () => {
    trackEvent("task_soft_deleted");
};

export const logTasksPullSynced = (tasksLength: number) => {
    trackEvent("tasks_pull_synced", {
        count: tasksLength,
    });
};

export const logTasksPushSynced = (tasksLength: number) => {
    trackEvent("tasks_push_synced", {
        count: tasksLength,
    });
};