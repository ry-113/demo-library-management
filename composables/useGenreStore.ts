import { getFirestore, getDocs, collection } from "firebase/firestore";
type Genre = {
  name: string;
};
export const useGenreStore = () => {
  const db = getFirestore();
  const genres = useState(():Genre[] => []);

  const getGenres = async () => {
    const fetchData: Genre[] = [];
    const querySnapshot = await getDocs(collection(db, "genres"));
    querySnapshot.forEach(doc => fetchData.push(doc.data() as Genre));
    genres.value = [...fetchData];
  };
  onMounted(() => {
    getGenres();
  });
  return { genres, getGenres };
};