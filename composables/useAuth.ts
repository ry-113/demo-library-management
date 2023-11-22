import type { Auth, User, UserCredential } from 'firebase/auth';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, collection, where, query, getDocs, doc, setDoc } from 'firebase/firestore';

export const useAuth = () => {
  const db = getFirestore();
  const auth = getAuth();
  const token = useState<string | null>('token', () => null);

  const getUser = async (uid: string): Promise<any> => {
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0];
  };

  const createUser = async (user: UserCredential) => {
    await setDoc(doc(db, 'users', user.user.uid), {
      uid: user.user.uid,
      name: user.user.displayName,
      email: user.user.email,
      photo: user.user.photoURL,
      role: 'student',
    });
  };

  //ログイン関数
  const logIn = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const googleUser = await signInWithPopup(auth, provider);
      const user = await getUser(googleUser.user.uid);
      const { updateUser } = useUser();
      if (user) {
        alert('既にユーザーが登録されています。');
        const userData = user.data();
        updateUser(userData);
        if (userData.role === 'student') {
          navigateTo(`/student/transaction-${userData.uid}`, { replace: true });
        } else if (userData.role === 'instructor') {
          navigateTo('instructor/transaction', { replace: true });
        } else if (userData.role === 'admin') {
          navigateTo('admin/user-management', { replace: true });
        }
      } else {
        alert('新規登録完了しました。');
        await createUser(googleUser);
        const user = await getUser(googleUser.user.uid);
        updateUser(user.data());
        navigateTo('/firstsettings', { replace: true });
      }
    } catch (error) {
      throw error;
    }
  };

  //ログアウト関数
  const logOut = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        token.value = null;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //認証状態チェック
  const checkAuthState = async () => {
    return await new Promise<void>((resolve, reject) => {
      if (process.server) {
        return resolve();
      }
      const auth = getAuth();
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            user
              .getIdToken()
              .then((idToken) => {
                token.value = idToken;
                resolve();
              })
              .catch(reject);
          } else {
            token.value = null;
            resolve();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  return {
    token,
    logIn,
    logOut,
    checkAuthState,
    getUser
  };
};
