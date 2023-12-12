<template>
  <AisInstantSearch :index-name="indexName" :search-client="algolia">
    <AppDebouncedSearchBox
      placeholder="タイトル・著者・その他キーワード"
      :autofocus="true"
      :show-loading-indicator="true"
      class="w-[40vw] mx-auto mb-10"
    />
    <div class="flex">
      <div class="left-box w-[30%]">
      <h2>フィルター</h2>
      <h3>評価</h3>
      <AisRatingMenu attribute="rating"/>
      <h3>ジャンル</h3>
      <AisRefinementList attribute="genre" :sort-by="['name:desc']" :limit="10"/>
      <h3>出版年</h3>
      <AisRefinementList attribute="year" :limit="5" :sort-by="['name:desc']" :show-more="true" />
      <h3>ラベル</h3>
      <AisRefinementList attribute="labels.name" :limit="5" :sort-by="['name:desc']" :show-more="true" />
    </div>
    <div class="right-box w-[70%]">
      <AisHits #item="{ item: book }">
        <div
          class="text-left card card-compact shadow-xl bg-base-100 xl:w-[80%] 2xl:w-[70%] mx-auto"
        >
          <NuxtLink :to="`/books/${book.bookid}-detail`">
            <figure>
              <img :src="book.imageURL || '/img/noimage.png'" alt="" class="rounded-t-2xl" />
            </figure>
            <div class="card-body">
              <p class="font-bold text-xs xl:text-sm">{{ book.title }}</p>
              <p class="text-xs">{{ book.author }}</p>
            </div>
          </NuxtLink>
        </div>
      </AisHits>
    </div>
    </div>
    
  </AisInstantSearch>
</template>

<script setup lang="ts">
import algoliaserch from 'algoliasearch';
import { AisInstantSearch, AisHits, AisRefinementList, AisRatingMenu } from 'vue-instantsearch/vue3/es';
import 'instantsearch.css/themes/algolia-min.css';
definePageMeta({
  middleware: ['auth'],
});
const indexName = 'book';
const algolia = useAlgoliaRef();
const { allBooks } = useBookStore();
const config = useRuntimeConfig();
const objects = allBooks.value;
const books = objects.map((book) => Object.assign(book, { objectID: book.bookid }));

const client = algoliaserch(config.public.algolia.applicationId, config.public.algolia.apiKey);
const index = client.initIndex('book');
await index.saveObjects(books);
</script>
