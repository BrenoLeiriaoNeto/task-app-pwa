import { trackEvent } from './firebaseConfig';

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

export const logTaskCreated = (category?: string) => {
    trackEvent('task_created', {
        category: category || "general",
    });
};

export const logTaskUpdated = (taskId: string) => {
    trackEvent("task_updated", {
        taskId: taskId,
    });
};

export const logTaskDeleted = (taskId: string) => {
    trackEvent("task_deleted", {
        taskId: taskId,
    });
};

export const logTaskCompleted = (taskId: string) => {
    trackEvent("task_completed", {
        taskId: taskId,
    });
};

export const logThemeChanged = (theme: "light" | "dark") => {
    trackEvent("theme_changed", {
        theme_selected: theme,
    });
}