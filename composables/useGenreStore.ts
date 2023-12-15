import { getFirestore, getDocs, collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
export type Genre = {
  name: string;
  genreid: string;
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
  const addGenre = async (newGenre: Genre) => {
    try {
      const genreRef = await addDoc(collection(db, 'genres'), newGenre);
      await updateDoc(doc(db, 'genres', genreRef.id), { genreid: genreRef.id });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGenre = async (genre: Genre) => {
    try {
      await deleteDoc(doc(db, "genres", genre.genreid));
    } catch(error) {
      console.error(error);
    }
  };
  onMounted(() => {
    getGenres();
  });
  return { genres, getGenres, addGenre, deleteGenre };
};