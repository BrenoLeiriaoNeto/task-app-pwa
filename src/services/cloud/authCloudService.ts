import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import {auth} from "../../storage/firebase/firebaseConfig.ts";
import {logNewUserRegistered, logUserLogin} from "../../storage/firebase/analyticsService.ts";
import {pullSyncFromFirestore} from "../syncService.ts";
import {registerUser} from "../local/authService.ts";

export const registerCloudUser = async (
    name: string,
    email: string,
    password: string
)=> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {displayName: name});
    logNewUserRegistered(user.uid);

    await registerUser(user.uid, name, email);

    return user;
}

export const loginCloudUser = async (
    email: string, password: string
) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await pullSyncFromFirestore(user.uid);

    logUserLogin(user.uid);
    return user;
};
