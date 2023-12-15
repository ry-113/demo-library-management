import { getFirestore, getDocs, collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
export type Label = {
  name: string;
  color: string;
  isChecked: boolean;
  labelid: string;
};
export const useLabelStore = () => {
  const db = getFirestore();
  const labels = useState((): Label[] => []);

  const getLabels = async () => {
    const fetchData: Label[] = [];
    const querySnapshot = await getDocs(collection(db, 'labels'));
    querySnapshot.forEach((doc) => fetchData.push(doc.data() as Label));
    labels.value = [...fetchData];
  };

  const addLabel = async (newLabel: Label) => {
    try {
      const labelRef = await addDoc(collection(db, 'labels'), newLabel);
      await updateDoc(doc(db, 'labels', labelRef.id), { labelid: labelRef.id });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLabel = async (label: Label) => {
    try {
      await deleteDoc(doc(db, "labels", label.labelid));
    } catch(error) {
      console.error(error);
    }
  };
  onMounted(() => {
    getLabels();
  });
  return { labels, getLabels, addLabel, deleteLabel };
};
