import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, updateDoc} from "firebase/firestore";
import type { Ref } from "vue";
type Label = {
  name: string;
  color: string;
  isChecked: boolean;
};
export type Book = {
  ISBN: string;
  author: string;
  bookid: string;
  description: string;
  genre: string;
  imageURL: string;
  labels: Label[];
  stock: number;
  title: string;
  year: number;
};

export const useBookStore = () => {
  const {uploadImage} = useBookStorage();
  const db = getFirestore();
  const allBooks: Ref<Book[]> = useState("allBooks", () => []);
  type BooksByGenre = {
    [genre: string]: Book[];
  };
  const booksByGenre = useState("booksByGenre", () => ({} as BooksByGenre));
  const isLoading = useState("isLoading", () => false);

  const getAllBooks = async () => {
    isLoading.value = true;
    const fetchData: Book[] = [];
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      fetchData.push(doc.data() as Book);
    });

    allBooks.value = [...fetchData];
    booksByGenre.value = {}; //初期化
    fetchData.forEach((book) => {
      const { genre } = book;
      if (!booksByGenre.value[genre]) {
        booksByGenre.value[genre] = [];
      }
      booksByGenre.value[genre].push(book);
    });

    isLoading.value = false;
  };

  const deleteBook = async (bookid: string) => {
    try {
      await deleteDoc(doc(db, "books", bookid));
    } catch (error) {
      console.error("本を削除中にエラーが発生：", error);
    }
  };

  const addBook = async (book: Book, file: File | null) => {
    const bookRef = await addDoc(collection(db, "books"), book);
    if(file) {
      await uploadImage(file, bookRef.id);
    }
    await updateDoc(doc(db, "books", bookRef.id), {
      bookid: bookRef.id,
    });
  };

  const updateBook = async (book: Book, file: File | null) => {
    if(file) {
      await uploadImage(file, book.bookid)
    }
    await updateDoc(doc(db, "books", book.bookid), book);
  };

  onMounted(() => {
    const isBooksExisting = sessionStorage.getItem("isBooksExisting");
    const booksTimestamp = sessionStorage.getItem("booksTimestamp");
    if (!isBooksExisting) {
      getAllBooks();
      sessionStorage.setItem("isBooksExisting", "true");
      sessionStorage.setItem("booksTimestamp", String(new Date()));
      console.log("初回のGET");
    } else if (booksTimestamp) {
      const lastUpdateTime = new Date(booksTimestamp).getTime();
      const now = new Date().getTime();
      const timeDiff = Math.abs(now - lastUpdateTime) / (1000 * 60); //単位は分
      if (timeDiff >= 10) {
        getAllBooks();
        sessionStorage.setItem("booksTimestamp", String(new Date()));
        console.log("10分以上たった");
      }
    }
  });

  return { allBooks, booksByGenre, isLoading, getAllBooks, deleteBook, addBook, updateBook };
};
