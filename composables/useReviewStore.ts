import { getFirestore, collection, getDocs, query, where, addDoc, updateDoc, doc, writeBatch} from 'firebase/firestore';
export type Review = {
  reviewid?: string;
  uid: string;
  username: string;
  photo: string;
  bookid: string;
  rating: number;
  title: string;
  description: string;
  timestamp: string;
};

export const useReviewStore = () => {
  const db = getFirestore();
  const reviews: Ref<Review[]> = useState(() => []);
  const getReviews = async (bookid: string | undefined) => {
    const q = query(collection(db, 'reviews'), where('bookid', '==', bookid));
    const querySnapShot = await getDocs(q);
    const fetchData = querySnapShot.docs.map((doc) => doc.data() as Review);
    reviews.value = [...fetchData];
  };

  const addReview = async (review: Review) => {
    const reviewRef = await addDoc(collection(db, 'reviews'), {
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
    const q = query(collection(db, "reviews"), where('bookid', '==', bookid));
    const querySnapShot = await getDocs(q);
    const batch = writeBatch(db);
    querySnapShot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  };
  return { reviews, getReviews, addReview, deleteReviews };
};
