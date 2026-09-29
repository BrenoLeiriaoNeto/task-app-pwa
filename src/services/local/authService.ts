import { localDb, type User } from "../../storage/indexedDb/dexieConfig.ts";

export const registerUser = async (
    id: string,
    name: string,
    email: string,
): Promise<void> => {
    const newUser: User = {
        id: id,
        name,
        email: email.toLowerCase(),
        updated_at: new Date().toISOString(),
    };

    await localDb.users.add(newUser);

}

export const loginUser = async (
    email: string,
    password: string
): Promise<User | null> => {
    const user = await localDb.users.where('email')
        .equals(email.toLowerCase())
        .first();

    if (user && user.password === password) {
        return user;
    }

    return null;
}

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
