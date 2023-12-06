import { getFirestore, getDocs, collection } from "firebase/firestore";
export type Label = {
  name: string;
  color: string;
  isChecked: boolean;
};
export const useLabelStore = () => {
  const db = getFirestore();
  const labels = useState((): Label[] => []);

  const getLabels = async () => {
    const fetchData: Label[] = [];
    const querySnapshot = await getDocs(collection(db, "labels"));
    querySnapshot.forEach((doc) => fetchData.push(doc.data() as Label));
    labels.value = [...fetchData];
  };
  onMounted(() => {
    getLabels();
  });
  return { labels, getLabels };
};
