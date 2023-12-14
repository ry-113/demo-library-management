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
          <div class="flex justify-between">
            <div class="left-box w-[20%] 2xl:w-[15%] mt-24 border-r-gray-200 border-r-2">
              <h2 class="text-lg">
                <Icon name="fluent:filter-12-regular" class="mr-2 mb-1" />フィルタ
              </h2>
              <AisClearRefinements class="mt-2">
                <template #resetLabel><span class="text-base">条件をリセット</span></template>
              </AisClearRefinements>
              <div class="mt-10">
                <h3><Icon name="bi:star" size="1rem" class="mr-1 mb-1" />評価</h3>
                <AisNumericMenu
                  attribute="rating"
                  :items="[
                    { label: ' 4.0 以上', start: 4, end: 5 },
                    { label: ' 3.0 - 4.0', start: 3, end: 4 },
                    { label: ' 2.0 - 3.0', start: 2, end: 3 },
                    { label: ' 1.0 - 2.0', start: 1, end: 2 },
                    { label: ' 1.0 以下', start: 0, end: 1 },
                  ]"
                />
              </div>
              <div class="mt-5">
                <h3>
                  <Icon
                    name="system-uicons:calendar-month"
                    size="1.25rem"
                    class="mr-1 mb-[3px]"
                  />出版年
                </h3>
                <AisSortBy
                  :items="[
                    { value: 'book', label: '選択' },
                    { value: 'instant_search_year_desc', label: '新しい順' },
                    { value: 'instant_search_year_asc', label: '古い順' },
                  ]"
                />
              </div>
              <div class="mt-5">
                <h3><Icon name="bi:inboxes" class="mr-1 mb-[3px]" />ジャンル</h3>
                <AisRefinementList attribute="genre" :sort-by="['name:desc']" />
              </div>

              <div class="mt-5">
                <h3>
                  <Icon
                    name="fluent:tag-multiple-16-regular"
                    size="1.25rem"
                    class="mr-1 mb-[3px]"
                  />ラベル
                </h3>
                <AisRefinementList attribute="labels.name" />
              </div>
            </div>
            <div class="right-box w-[75%] 2xl:[w-80%] mt-6">
              <AppDebouncedSearchBox
                placeholder="タイトル・著者・その他キーワードで検索 (例: HTML 初心者)"
                :autofocus="true"
                :show-loading-indicator="true"
                class="w-[80%] mx-auto mb-8"
              />
              <Icon name="ant-design:search-outlined" size="1.5rem" class="ml-3" />
              <AisStats>
                <template v-slot="{ nbHits, processingTimeMS }">
                  検索結果：{{ nbHits }} 件 ({{ processingTimeMS }}ms)
                </template>
              </AisStats>
              <AisConfigure :hits-per-page.camel="15" />
              <AisHits>
                <template v-slot="{ items: books }">
                  <ul class="flex flex-wrap gap-5 2xl:gap-8 py-3">
                    <li
                      v-for="book in books"
                      :key="book.objectID"
                      class="text-left card card-compact shadow-xl bg-base-100 w-[30%] xl:w-[25%] 2xl:w-[16%]"
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
                          <p class="font-bold text-xs xl:text-sm">
                            {{ book.title }}
                          </p>
                          <p class="text-xs">{{ book.author }}</p>
                        </div>
                      </NuxtLink>
                    </li>
                  </ul>
                </template>
              </AisHits>
              <AisPagination class="my-8" />
            </div>
          </div>
        </AisInstantSearch>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {
  AisInstantSearch,
  AisHits,
  AisRefinementList,
  AisNumericMenu,
  AisClearRefinements,
  AisStats,
  AisConfigure,
  AisPagination,
  AisSortBy,
} from 'vue-instantsearch/vue3/es';

import 'instantsearch.css/themes/algolia-min.css';
definePageMeta({
  middleware: ['auth'],
  layout: false,
});
const indexName = 'book';
const algolia = useAlgoliaRef();

const { allBooks } = useBookStore();
const { addAlgolia } = useAlgolia();
await addAlgolia(allBooks.value);
</script>
