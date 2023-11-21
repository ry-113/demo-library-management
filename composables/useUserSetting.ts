import { getFirestore, doc, collection, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const useUserSetting = () => {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    const usersCol = collection(db, "users");
    
    const changeName = async (displayName: string) => {
        if(user) {
            const userRef = doc(usersCol, user.uid);
            await updateDoc(userRef, {
                name: displayName,
            });
        }
    }
    return { changeName }
}