import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  runTransaction,
  query,
  where,
} from 'firebase/firestore';

export type Transaction = {
  bookTitle: string;
  bookid: string;
  duedate: string;
  nowdate: string;
  status: string;
  transactionid: string;
  uid: string;
  userName: string;
  userPhoto: string;
};

export const useTransactionStore = () => {
  const db = getFirestore();
  const allTransactions: Ref<Transaction[]> = useState(() => []);
  const isLoading = useState(() => false);
  const getAllTransactions = async () => {
    isLoading.value = true;
    const fetchData: Transaction[] = [];
    const querySnapshot = await getDocs(collection(db, 'transactions'));
    querySnapshot.forEach((doc) => {
      fetchData.push(doc.data() as Transaction);
    });

    allTransactions.value = [...fetchData];
    isLoading.value = false;
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
          transaction.update(transactionDocRef, { status: '貸出中' });
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
        where('status', '==', '貸出中')
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const transactionDoc = querySnapshot.docs[0];
        const updateNeededObj = { 
          nowdate: new Date().toLocaleString(),
          status: "返却確認",
        };
        await updateDoc(doc(transactionColRef, transactionDoc.id), updateNeededObj);
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
        transaction.update(transactionDocRef, { status: '返却済み' });
        return newBookStock;
      });

      console.log(`${returnReq.bookTitle}の在庫数が${newBookStock}になりました。`);
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(() => getAllTransactions());

  return { isLoading, allTransactions, getAllTransactions, borrowReq, borrowBook, returnReq, returnBook };
};