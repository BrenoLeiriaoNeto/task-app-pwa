import { localDb, type User } from "../storage/indexedDb/dexieConfig.ts";

export const registerUser = async (
    name: string,
    email: string,
    password: string
): Promise<User> => {
    const newUser: User = {
        id: crypto.randomUUID(),
        name,
        email: email.toLowerCase(),
        password
    };

    await localDb.users.add(newUser);

    return newUser;
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