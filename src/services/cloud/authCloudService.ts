import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import {auth} from "../../storage/firebase/firebaseConfig.ts";
import {logNewUserRegistered, logUserLogin} from "../../storage/firebase/analyticsService.ts";
import {localDb} from "../../storage/indexedDb/dexieConfig.ts";

export const registerCloudUser = async (
    email: string,
    password: string
)=> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    logNewUserRegistered(user.uid);

    return user;
}

export const loginCloudUser = async (
    email: string, password: string
) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;


    logUserLogin(user.uid);
    return user;
};

export const logoutCloudUser = async () => {
    try {
        await signOut(auth);

        localStorage.removeItem('pwa_userId');

        await localDb.tasks.clear();

    } catch (error) {
        console.error('[Auth] Erro durante o logout:', error);
    }
}
