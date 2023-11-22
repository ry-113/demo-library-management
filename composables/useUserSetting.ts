import { getFirestore, doc, collection, updateDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

export const useUserSetting = () => {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    const usersCol = collection(db, "users");
    
    const changeName = async (displayName: string) => {
        if(user) {
            //authの情報を変更
            updateProfile(user, {
                displayName
            });
            //firestoreの情報を変更
            const userRef = doc(usersCol, user.uid);
            await updateDoc(userRef, {
                name: displayName,
            });
        }
    }
    return { changeName }
}