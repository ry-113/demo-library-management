import {getFirestore, collection, getDocs, doc, deleteDoc, updateDoc} from "firebase/firestore"
export type AppUser = {
    email: string;
    name: string;
    photo: string;
    role: string;
    uid: string;
};

export const useUserStore = () => {
    const db = getFirestore();
    const allUsers: Ref<AppUser[]> = useState("allUsers", () => []);
    const isLoading = useState("isLoading", () => false);
    const getAllUsers = async () => {
        isLoading.value = true;
        const fetchData:AppUser[] = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach(doc => {
            fetchData.push(doc.data() as AppUser);
        });
        allUsers.value = [...fetchData];
        isLoading.value = false;
    };

    const changeRole = async (uid: string, role:string) => {
        try{
            await updateDoc(doc(db, "users", uid), {role});
            alert("ユーザーロールが正常に変更されました");
        } catch(error) {
            console.error(error);
        }
    }

    const deleteUser = async (uid:string) => {
        try{
            await deleteDoc(doc(db, "users", uid));
        } catch(error) {
            console.error("ユーザー削除中にエラーが発生：", error);
        }
        
    }

    onMounted(() => {
        const isUsersExisting = sessionStorage.getItem("isUsersExisting");
        const usersTimestamp = sessionStorage.getItem("usersTimestamp");
        if(!isUsersExisting) {
            getAllUsers();
            sessionStorage.setItem("isUsersExisting", "true");
            sessionStorage.setItem("usersTimestamp", String(new Date()));
            console.log("ユーザーの初回ゲット");
        } else if (usersTimestamp) {
            const lastUpdateTime = new Date(usersTimestamp).getTime();
            const now = new Date().getTime();
            const timeDiff = Math.abs(now - lastUpdateTime) / (1000 * 60);
            if(timeDiff >= 30) {
                getAllUsers();
                sessionStorage.setItem("usersTimestamp", String(new Date()));
                console.log("前回のユーザー取得から30分経過");
            }
        }
    });

    return {allUsers, isLoading, getAllUsers, changeRole, deleteUser};
};