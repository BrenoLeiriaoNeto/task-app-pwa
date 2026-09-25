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

export const updateUser = async (
    id: string,
    name: string,
    email: string,
    updated_at: string
): Promise<void> => {

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