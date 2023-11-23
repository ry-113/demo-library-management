import { getFirestore, collection, getDocs} from "firebase/firestore";

export const useBookStore = () => {
  const db = getFirestore();

  const getAllBooks = async () => {
    const allBooks = [];
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      allBooks.push(doc.data());
    });
    return allBooks;
  };
  
  return {getAllBooks}
};
