<template>
  <div v-if="isLoading">ロード中...</div>
  
  <div v-for="[genre, books] in Object.entries(booksByGenre)">
    <h2 class="mt-6 text-xl">{{ genre }}</h2>
    <ul
      class="carousel carousel-center p-4 space-x-4 bg-stone-100 rounded-box overflow-x-hidden"
    >
      <li
        v-for="book in books"
        :key="book.bookid"
        class="mb-3 carousel-item card card-compact shadow-xl bg-base-100 w-[190px]"
      >
        <NuxtLink :to="`/books/${book.bookid}-detail`">
          <figure>
            <img src="/img/book_dummy.png" alt="" class="rounded-t-2xl" />
          </figure>
          <div class="card-body">
            <p class="font-bold text-xs">{{ book.title }}</p>
            <p class="text-xs">{{ book.author }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const { booksByGenre, isLoading } = useBookStore();
</script>
