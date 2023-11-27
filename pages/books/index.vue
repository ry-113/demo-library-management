<template>
  <div v-for="num in 3" :key="num">
    <h2 class="mt-6 text-xl">ジャンル名</h2>
    <ul
      class="carousel carousel-center p-4 space-x-4 bg-stone-100 rounded-box overflow-x-hidden"
    >
      <li
        v-for="book in allBooks"
        :key="book.bookid"
        class="mb-3 carousel-item card card-compact shadow-xl bg-base-100 w-[180px]"
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
const { allBooks } = useBookStore();
</script>
