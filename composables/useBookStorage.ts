import { getStorage, ref, uploadBytes } from "firebase/storage";

export const useBookStorage = () => {
  const storage = getStorage();

  const uploadImage = async (file: File | null) => {
    if (file) {
      const bookRef = ref(storage, `book/${file.name}`);
      await uploadBytes(bookRef, file)
        .then((snapshot) => {
          console.log("アップロードしました！");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return { uploadImage };
};
