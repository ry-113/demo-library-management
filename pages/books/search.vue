<template>
  <AisInstantSearch :index-name="indexName" :search-client="algolia">
    <AisSearchBox
      placeholder="本の名前で検索する"
      :autofocus="true"
      :show-loading-indicator="true"
      class="w-[40vw] mx-auto mb-10 text-xl"
    />
    <AisHits #item="{ item: book }" class="border-0">
      <div
        class="text-left card card-compact shadow-xl bg-base-100 w-[65%] mx-auto"
      >
        <NuxtLink :to="`/books/${book.bookid}-detail`">
          <figure>
            <img
              :src="book.imageURL || '/img/noimage.png'"
              alt=""
              class="rounded-t-2xl"
            />
          </figure>
          <div class="card-body">
            <p class="font-bold text-xs xl:text-sm">{{ book.title }}</p>
            <p class="text-xs">{{ book.author }}</p>
          </div>
        </NuxtLink>
      </div>
    </AisHits>
  </AisInstantSearch>
</template>

<script setup lang="ts">
import algoliaserch from "algoliasearch";
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
} from "vue-instantsearch/vue3/es";
import "instantsearch.css/themes/algolia-min.css";
const indexName = "book";
const algolia = useAlgoliaRef();
const { allBooks } = useBookStore();
const config = useRuntimeConfig();
const objects = allBooks.value;
const books = objects.map((book) =>
  Object.assign(book, { objectID: book.bookid })
);

const client = algoliaserch(
  config.public.algolia.applicationId,
  config.public.algolia.apiKey
);
const index = client.initIndex("book");
await index.saveObjects(books);
</script>
