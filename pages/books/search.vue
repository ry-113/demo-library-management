<template>
  <div>
    <NuxtLayout name="default">
      <template #breadcrumbs>
        <div class="text-sm breadcrumbs">
          <ul>
            <li><NuxtLink to="/books">本棚</NuxtLink></li>
            <li>検索</li>
          </ul>
        </div>
      </template>
      <template #default>
        <AisInstantSearch :index-name="indexName" :search-client="algolia">
          <div class="flex">
            <div class="left-box w-[30%] 2xl:w-[20%] mt-10 pl-10">
              <h2 class="text-lg">フィルタ<Icon name="fluent:filter-12-regular" class="ml-2" /></h2>
              <AisClearRefinements class="mt-2">
                <template #resetLabel><span class="text-base">条件をリセット</span></template>
              </AisClearRefinements>
              <div class="mt-5">
                <h3>評価</h3>
                <AisRatingMenu attribute="rating">
                  <template v-slot="{ items, refine, createURL }">
                    <ul>
                      <li v-for="item in items" :key="item.value">
                        <NuxtLink
                          class="text-amber-400 cursor-pointer"
                          @click.prevent="refine(item.value)"
                        >
                          <span v-for="(full, index) in item.stars" :key="index">
                            {{ full ? '★' : '☆' }}
                          </span>
                          <span class="text-gray-900"> {{ item.value }}以上 </span>
                          <span class="text-gray-900"> ({{ item.count }}) </span>
                        </NuxtLink>
                      </li>
                    </ul>
                  </template>
                </AisRatingMenu>
              </div>
              <div class="mt-5">
                <h3>ジャンル</h3>
                <AisRefinementList attribute="genre" :sort-by="['name:desc']" />
              </div>

              <div class="mt-5">
                <h3>ラベル</h3>
                <AisRefinementList attribute="labels.name" />
              </div>
            </div>
            <div class="right-box w-[70%] 2xl:[w-80%]">
              <AppDebouncedSearchBox
                placeholder="タイトル・著者・その他キーワードで検索"
                :autofocus="true"
                :show-loading-indicator="true"
                class="w-[40vw] mx-auto mb-10"
              />
              <AisHits>
                <template v-slot="{ items: books }">
                  <ul class="flex flex-wrap gap-5 2xl:gap-8 py-3">
                    <li
                      v-for="book in books"
                      :key="book.objectID"
                      class="text-left card card-compact shadow-xl bg-base-100 w-[30%] xl:w-[20%] 2xl:w-[14%]"
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
                    </li>
                  </ul>
                </template>
              </AisHits>
            </div>
          </div>
        </AisInstantSearch>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import algoliaserch from 'algoliasearch';
import {
  AisInstantSearch,
  AisHits,
  AisRefinementList,
  AisRatingMenu,
  AisClearRefinements,
} from 'vue-instantsearch/vue3/es';
import 'instantsearch.css/themes/algolia-min.css';
definePageMeta({
  middleware: ['auth'],
  layout: false,
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