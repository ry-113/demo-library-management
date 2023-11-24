import { getFirestore, collection, getDocs } from "firebase/firestore";

export const useBookStore = () => {
  const db = getFirestore();
  const allBooks = useState("allBooks", () => []);
  const getAllBooks = async () => {
    const fetchData = [];
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      fetchData.push(doc.data());
    });
    allBooks.value = fetchData;
  };

  onMounted(() => {
    const isExisting = sessionStorage.getItem("isExisting");
    const timestamp = sessionStorage.getItem("timestamp");
    if (!isExisting) {
      getAllBooks();
      sessionStorage.setItem("isExisting", "true");
      sessionStorage.setItem("timestamp", String(new Date()));
      console.log("初回のGET");
    } else if (timestamp) {
      const lastUpdateTime = new Date(timestamp).getTime();
      const now = new Date().getTime();
      const timeDiff = Math.abs(now - lastUpdateTime) / (1000 * 60); //単位は分
      if (timeDiff >= 10) {
        getAllBooks();
        sessionStorage.setItem("timestamp", String(new Date()));
        console.log("10分以上たった");
      }
    }
  });
  return { allBooks, getAllBooks };
};
