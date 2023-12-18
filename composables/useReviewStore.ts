import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";
export type Review = {
  reviewid: string;
  uid: string;
  username: string;
  photo: string;
  bookid: string;
  rating: number;
  title: string;
  description: string;
  timestamp: firebase.firestore.Timestamp;
};

export const useReviewStore = () => {
  const db = getFirestore();
  const reviews: Ref<Review[]> = useState(() => []);
  const myReviews: Ref<Review[]> = useState(() => []);
  const lastVisible = useState(() => null);

  const getReviews = async (bookid: string | undefined) => {
    const q = query(collection(db, "reviews"), where("bookid", "==", bookid));
    const querySnapshot = await getDocs(q);
    const fetchData = querySnapshot.docs.map((doc) => doc.data() as Review);
    reviews.value = [...fetchData];
  };

  const addReview = async (review: Review) => {
    const reviewRef = await addDoc(collection(db, "reviews"), {
      uid: review.uid,
      username: review.username,
      photo: review.photo,
      bookid: review.bookid,
      rating: review.rating,
      title: review.title,
      description: review.description,
      timestamp: review.timestamp,
    });
    await updateDoc(doc(db, "reviews", reviewRef.id), {
      reviewid: reviewRef.id,
    });
  };

  const deleteReviews = async (bookid: string) => {
    const q = query(collection(db, "reviews"), where("bookid", "==", bookid));
    const querySnapShot = await getDocs(q);
    const batch = writeBatch(db);
    querySnapShot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  };

  const getMyReviews = async (uid: string) => {
    const fetchData: Review[] = [];
    const reviewColRef = collection(db, "reviews");
    const firstQ = query(
      reviewColRef,
      where("uid", "==", uid),
      orderBy("timestamp", "desc"),
      limit(10)
    );
    const querySnapshot = await getDocs(firstQ);
    lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1]
    querySnapshot.forEach((doc) => {
      fetchData.push(doc.data() as Review);
    });
    myReviews.value = [...fetchData];
  };

  const fetchNextPageOfUser = async (uid: string) => {
    const reviewsColRef = collection(db, 'reviews');
    if (lastVisible.value) {
      const nextQ = query(
        reviewsColRef,
        where("uid", '==', uid),
        orderBy('timestamp', 'desc'),
        startAfter(lastVisible.value),
        limit(10)
      );
      const querySnapshot = await getDocs(nextQ);
      const newFetchData = querySnapshot.docs.map((doc) => doc.data() as Review);
      lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1];
      myReviews.value.push(...newFetchData);
    }
  };

  const updateReview = async (review: Review) => {
    try {
    await updateDoc(doc(db, "reviews", review.reviewid), review);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReview = async (reviewid: string) => {
    try {
      await deleteDoc(doc(db, "reviews", reviewid));
    } catch (error) {
      console.error(error);
    }
  };

  return { reviews, myReviews, lastVisible, getReviews, addReview, deleteReviews, getMyReviews,fetchNextPageOfUser, updateReview, deleteReview };
};
