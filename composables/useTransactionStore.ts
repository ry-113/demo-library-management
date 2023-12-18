import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  runTransaction,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';

export type Transaction = {
  bookTitle: string;
  bookid: string;
  duedate: firebase.firestore.Timestamp;
  nowdate: firebase.firestore.Timestamp;
  status: string;
  transactionid: string;
  uid: string;
  userName: string;
  userPhoto: string;
};

export const useTransactionStore = () => {
  const db = getFirestore();
  const allTransactions: Ref<Transaction[]> = useState(() => []);
  const myTransactions: Ref<Transaction[]> = useState(() => []);
  const isLoading = useState(() => false);
  const lastVisible = useState(() => null);

  const getAllTransactions = async () => {
    isLoading.value = true;
    const fetchData: Transaction[] = [];
    const transactionColRef = collection(db, 'transactions');
    const firstQ = query(transactionColRef, orderBy('nowdate', 'desc'), limit(20));
    const querySnapshot = await getDocs(firstQ);
    lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1];
    querySnapshot.forEach((doc) => {
      fetchData.push(doc.data() as Transaction);
    });
    allTransactions.value = [...fetchData];
    isLoading.value = false;
  };

  const getMyTransactions = async (uid: string) => {
    isLoading.value = true;
    const fetchData: Transaction[] = [];
    const transactionColRef = collection(db, 'transactions');
    const q = query(
      transactionColRef,
      where('uid', '==', uid),
      orderBy('nowdate', 'asc'),
      limit(30)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      fetchData.push(doc.data() as Transaction);
    });

    myTransactions.value = [...fetchData];
    isLoading.value = false;
  };

  const fetchNextPage = async () => {
    const transactionColRef = collection(db, 'transactions');
    if (lastVisible.value) {
      const nextQ = query(
        transactionColRef,
        orderBy('nowdate', 'desc'),
        startAfter(lastVisible.value),
        limit(20)
      );
      const querySnapshot = await getDocs(nextQ);
      const newFetchData = querySnapshot.docs.map((doc) => doc.data() as Transaction);
      lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1];
      allTransactions.value.push(...newFetchData);
    }
  };

  const updateExpiredTransaction = async () => {
    //指導員か管理者のみ実行可能にするか
    const transactionColRef = collection(db, 'transactions');
    const now = new Date();

    try {
      const q = query(
        transactionColRef,
        where('status', '==', '貸出中'),
        where('duedate', '<', now.toLocaleString())
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        return false;
      }
      const batch = writeBatch(db);
      querySnapshot.docs.forEach((doc) => {
        batch.update(doc.ref, { status: '期限切れ' });
      });

      await batch.commit();
      console.log(`${querySnapshot.size}冊の本が期限切れになりました`);
    } catch (error) {
      console.error(error);
    }
  };

  const borrowReq = async (borrowReq: Transaction) => {
    try {
      const transactionRef = await addDoc(collection(db, 'transactions'), borrowReq);
      await updateDoc(doc(db, 'transactions', transactionRef.id), {
        transactionid: transactionRef.id,
        status: '貸出確認',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const borrowBook = async (borrowReq: Transaction) => {
    const transactionDocRef = doc(db, 'transactions', borrowReq.transactionid);
    const bookDocRef = doc(db, 'books', borrowReq.bookid);
    try {
      const newBookStock = await runTransaction(db, async (transaction) => {
        const bookDoc = await transaction.get(bookDocRef);
        if (!bookDoc.exists()) {
          throw 'ドキュメントが存在しません';
        }
        const newBookStock = bookDoc.data().stock - 1;

        if (newBookStock >= 0) {
          transaction.update(bookDocRef, { stock: newBookStock });
          transaction.update(transactionDocRef, { status: '貸出中', nowdate: new Date() });
          return newBookStock;
        } else {
          alert('在庫がないため貸出確認を承認できません。');
          return Promise.reject('在庫がありません。');
        }
      });

      console.log(`${borrowReq.bookTitle}の在庫数が${newBookStock}になりました。`);
    } catch (error) {
      console.error(error);
    }
  };

  const returnReq = async (returnReq: Transaction) => {
    try {
      const transactionColRef = collection(db, 'transactions');
      const q = query(
        transactionColRef,
        where('uid', '==', returnReq.uid),
        where('bookid', '==', returnReq.bookid),
        where('status', 'in', ['貸出中', '期限切れ'])
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const transactionDoc = querySnapshot.docs[0];
        const updateNeededObj = {
          nowdate: new Date(),
          status: '返却確認',
        };
        await updateDoc(doc(transactionColRef, transactionDoc.id), updateNeededObj);
        alert('返却リクエストが送信されました。承認されるまで少々お待ちください。');
      } else {
        alert('あなたの貸出中リストに存在していません。');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const returnBook = async (returnReq: Transaction) => {
    const transactionDocRef = doc(db, 'transactions', returnReq.transactionid);
    const bookDocRef = doc(db, 'books', returnReq.bookid);
    try {
      const newBookStock = await runTransaction(db, async (transaction) => {
        const bookDoc = await transaction.get(bookDocRef);
        if (!bookDoc.exists()) {
          throw 'ドキュメントが存在しません';
        }
        const newBookStock = bookDoc.data().stock + 1;

        transaction.update(bookDocRef, { stock: newBookStock });
        transaction.update(transactionDocRef, { status: '返却済み', nowdate: new Date() });
        return newBookStock;
      });

      console.log(`${returnReq.bookTitle}の在庫数が${newBookStock}になりました。`);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelTransaction = async (transaction: Transaction) => {
    const transactionDocRef = doc(db, 'transactions', transaction.transactionid);
    if (transaction.status === '貸出確認') {
      await deleteDoc(transactionDocRef);
    } else {
      await updateDoc(transactionDocRef, { status: '貸出中' });
    }
  };

  onMounted(() => {
    const checkExpiredAt = localStorage.getItem('checkExpiredAt');
    if (!checkExpiredAt) {
      updateExpiredTransaction();
      localStorage.setItem('checkExpiredAt', String(new Date()));
      console.log('期限切れのチェック終了');
    } else {
      const lastUpdateTime = new Date(checkExpiredAt).getTime();
      const now = new Date().getTime();
      const timeDiff = Math.abs(now - lastUpdateTime) / (1000 * 60 * 60 * 24); //単位は日
      if (timeDiff >= 1) {
        updateExpiredTransaction();
        localStorage.setItem('checkExpiredAt', String(new Date()));
        console.log('1日経過');
      }
    }
  });

  return {
    isLoading,
    lastVisible,
    allTransactions,
    myTransactions,
    getAllTransactions,
    getMyTransactions,
    fetchNextPage,
    borrowReq,
    borrowBook,
    returnReq,
    returnBook,
    cancelTransaction,
    updateExpiredTransaction,
  };
};
