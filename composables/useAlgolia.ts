import algoliaserch from 'algoliasearch';
export const useAlgolia = () => {
  const config = useRuntimeConfig();
  const client = algoliaserch(config.public.algolia.applicationId, config.public.algolia.apiKey);
  const index = client.initIndex('book');

  const addAlgolia = async (book: Book, bookid: string) => {
    const bookWithId = {...book, ...{objectID: bookid, bookid: bookid}};
    console.log(bookWithId);
    try {
      await index.saveObject(bookWithId);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAlgolia = async (book: Book) => {
    try {
        const bookWithId = {...book, ...{objectID: book.bookid}}
      await index.partialUpdateObject(bookWithId);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAlgolia = async (book: Book) => {
    try {
      await index.deleteObject(book.bookid);
    } catch (error) {
      console.error(error);
    }
  };

  return {addAlgolia, updateAlgolia, deleteAlgolia};
};
