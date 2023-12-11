<template>
  <div>ここは検索ページです</div>
</template>

<script setup lang="ts">
import algoliaserch from "algoliasearch";
const { allBooks } = useBookStore();
const config = useRuntimeConfig();
const objects = allBooks.value;
const books = objects.map((book) => Object.assign(book, { objectID: book.bookid }));

const client = algoliaserch(config.public.algolia.applicationId, config.public.algolia.apiKey);
const index = client.initIndex("book");
await index.saveObjects(books);
index.search("HTML")
  .then(({ hits })=> console.log(hits));
</script>

