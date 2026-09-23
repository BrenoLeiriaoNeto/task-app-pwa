import { trackEvent } from './firebaseConfig';

export const logTaskCreated = (category?: string) => {
    trackEvent('task_created', {
        category: category || "general",
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