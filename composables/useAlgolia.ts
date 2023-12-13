import algoliaserch from 'algoliasearch';
export const useAlgolia = () => {
  const config = useRuntimeConfig();
  const client = algoliaserch(config.public.algolia.applicationId, config.public.algolia.apiKey);
  const index = client.initIndex('book');

  const addAlgolia = async (books: Book[]) => {
    const booksWithId = books.map(book => ({...book, objectID: book.bookid}));
    await index.saveObjects(booksWithId);
  };

  const deleteAlgolia = async (book: Book) => {
    try {
      await index.deleteObject(book.bookid);
    } catch (error) {
      console.error(error);
    }
  };

  return {addAlgolia, deleteAlgolia};
};
