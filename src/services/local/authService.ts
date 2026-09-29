export const authLocalService = {
    saverUserId: (userId: string) => {
        localStorage.setItem('pwa_userId', userId);
    },
    getUserId: (): string | null => {
        return localStorage.getItem('pwa_userId');
    },
    clearUserId: () => {
        localStorage.removeItem('pwa_userId');
    }
}
