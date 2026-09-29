import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {auth} from "../../storage/firebase/firebaseConfig.ts";
import {logNewUserRegistered, logUserLogin} from "../../storage/firebase/analyticsService.ts";

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
