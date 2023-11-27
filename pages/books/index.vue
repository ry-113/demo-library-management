<template>
  <div v-if="isLoading" class="w-full h-[85vh] flex justify-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>

  <div v-else v-for="[genre, books] in Object.entries(booksByGenre)" :key="genre" class="px-5 relative w-full">
    <h2 class="mt-6 text-xl">{{ genre }}</h2>
    <Carousel
      class="carousel carousel-center p-4 space-x-4 bg-stone-100 rounded-box w-[85vw]"
      :items-to-show="5"
    >
    <!-- ココを変更する -->
      <Slide v-for="book in books" :key="book.bookid">
        <li class="mb-3 carousel__item card card-compact shadow-xl bg-base-100 w-[190px]">
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
      </Slide>

      <template #addons>
        <Navigation/>
      </template>
    </Carousel>
  </div>
  <!-- ジャンルごとに分ける場合は下記のコードに帰る -->
  <!-- <div v-else v-for="[genre, books] in Object.entries(booksByGenre)">
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
  </div> -->
</template>
<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
const { allBooks, booksByGenre, isLoading } = useBookStore();
console.log(booksByGenre.value);
</script>
