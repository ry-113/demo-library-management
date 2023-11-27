import { getFirestore, collection, getDocs } from 'firebase/firestore';
import type { Ref } from 'vue';
export type Book = {
  ISBN: string;
  author: string;
  bookid: string;
  description: string;
  genre: string;
  imageURL: string;
  labels: string[];
  stock: number;
  title: string;
  year: number;
};

export const useBookStore = () => {
  const db = getFirestore();
  const allBooks: Ref<Book[]> = useState('allBooks', () => []);
  type BooksByGenre = {
    [genre: string]: Book[];
  };
  const booksByGenre = useState("booksByGenre", () => ({} as BooksByGenre));
  const isLoading = useState("isLoading", () => false);

  const getAllBooks = async () => {
    isLoading.value = true;
    const fetchData: Book[] = [];
    const querySnapshot = await getDocs(collection(db, 'books'));
    querySnapshot.forEach((doc) => {
      fetchData.push(doc.data() as Book);
    });

    allBooks.value = [...fetchData];
    booksByGenre.value = {};//初期化
    fetchData.forEach(book => {
      const {genre} = book;
      if(!booksByGenre.value[genre]) {
        booksByGenre.value[genre] = [];
      }
      booksByGenre.value[genre].push(book);
    });

    isLoading.value = false;
  };

  onMounted(() => {
    const isExisting = sessionStorage.getItem('isExisting');
    const timestamp = sessionStorage.getItem('timestamp');
    if (!isExisting) {
      getAllBooks();
      sessionStorage.setItem('isExisting', 'true');
      sessionStorage.setItem('timestamp', String(new Date()));
      console.log('初回のGET');
    } else if (timestamp) {
      const lastUpdateTime = new Date(timestamp).getTime();
      const now = new Date().getTime();
      const timeDiff = Math.abs(now - lastUpdateTime) / (1000 * 60); //単位は分
      if (timeDiff >= 10) {
        getAllBooks();
        sessionStorage.setItem('timestamp', String(new Date()));
        console.log('10分以上たった');
      }
    }
    
  });

  return { allBooks, booksByGenre, isLoading, getAllBooks };
};
