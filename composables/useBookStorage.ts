import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {getFirestore, doc, updateDoc } from "firebase/firestore";
export const useBookStorage = () => {
  const storage = getStorage();
  const db = getFirestore();

  const uploadImage = async (file: File | null, docRefId: string) => {
    if (file) {
      const bookRef = ref(storage, `book/${file.name}`);
      await uploadBytes(bookRef, file)
        .then((snapshot) => {
          console.log("アップロードしました！");
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            //ここでdownloadURLをfirestoreに保存する
            updateDoc(doc(db, "books", docRefId), {imageURL: downloadURL});
          }).catch((error) => {
            console.error(error);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return { uploadImage };
};
