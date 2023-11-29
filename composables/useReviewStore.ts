import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
export type Review = {
    reviewid: string;
    uid: string;
    username: string;
    photo: string;
    bookid: string;
    rating: number;
    title: string;
    description: string;
    timestamp: Date;
};

export const useReviewStore = () => {
    const db = getFirestore();
    const getReviews = async (bookid: string | undefined):Promise<Review[]> => {
        const q = query(collection(db, "reviews"), where("bookid", "==", bookid));
        const querySnapShot = await getDocs(q);
        const reviews = querySnapShot.docs.map(doc => doc.data() as Review);
        return reviews;
    };

    return {getReviews};
};