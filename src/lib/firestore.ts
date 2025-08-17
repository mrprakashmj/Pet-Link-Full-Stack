
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "./firebase";
import type { AppUser } from "./types";

export const createUserProfile = async (uid: string, data: AppUser) => {
    try {
        await setDoc(doc(db, "users", uid), data);
    } catch (error) {
        console.error("Error creating user profile: ", error);
        throw error;
    }
}

export const getUserProfile = async (uid: string): Promise<AppUser | null> => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as AppUser;
        } else {
            console.warn("User profile document does not exist for uid:", uid);
            return null;
        }
    } catch (error) {
        // This will catch the "client is offline" error and prevent a crash.
        // The onAuthStateChanged listener will still have the basic user info from auth.
        console.error("Error getting user profile (client may be offline):", error);
        return null;
    }
}
