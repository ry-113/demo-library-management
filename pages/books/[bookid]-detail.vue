<template>
  <div>
    <NuxtLayout name="default">
      <template #breadcrumbs>
        <div class="text-sm breadcrumbs">
          <ul>
            <li><NuxtLink to="/books">本棚</NuxtLink></li>
            <li>
              <NuxtLink :to="`/books/${book?.genre}`">{{ book?.genre }}</NuxtLink>
            </li>
            <li>{{ book?.title }}</li>
          </ul>
        </div>
      </template>

      <template #default>
        <div class="max-w-[1500px] mx-auto">
          <div class="heading border-b-2 border-b-gray-400 relative py-4">
            <h1 class="text-2xl mt-10 mb-2">{{ book?.title }}</h1>
            <p class="text-lg">{{ book?.author }}</p>
            <ReviewDisplay :rating="3.5"></ReviewDisplay>

            <div class="action-btns flex absolute bottom-4 right-0 gap-5">
              <button class="btn w-32">レビュー投稿</button>
              <button class="btn w-32">借りる</button>
              <button class="btn w-32">返す</button>
            </div>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
const route = useRoute();
const bookid = route.params.bookid;
const { allBooks } = useBookStore();
const book = allBooks.value.find((book) => book.bookid === bookid);
</script>
