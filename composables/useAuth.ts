import {
    Auth,
    User,
    UserCredential,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import {computed, ref} from "vue";

import {
    collection,
    where,
    query,
    getDocs,
    addDoc
} from "@firebase/firestore";

export function useAuth() {
    const {$auth, $firestore} = useNuxtApp();
    const user = ref<User | null>($auth.currentUser);
    const isAuthed = computed(() => !!user.value);
    const db = $firestore;

    $auth.onIdTokenChanged((authUser) => (user.value = authUser));

    const getUser = async (uid: string): Promise<any> => {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs[0]
    };

    //ユーザー作成
    const createUser = async (user: UserCredential) => {
        await addDoc(collection(db, "users"), {
            uid: user.user.uid,
            name: user.user.displayName,
            email: user.user.email,
            photo: user.user.photoURL
        })
    };

    //Google新規登録
    async function googleSignUp() {
        try {
            const provider = new GoogleAuthProvider();
            const googleUser = await signInWithPopup($auth, provider);
            const user = await getUser(googleUser.user.uid);
            const {updateUser} = await useUser();
        }
    }
}

