<template>
  <div v-if="isLoading" class="w-full h-[85vh] flex justify-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>

  <div v-else v-for="[genre, books] in Object.entries(booksByGenre)" :key="genre" class="px-5 relative w-full mb-12">
    <div class="section--header flex justify-between items-center pr-8 mb-3">
      <h2 class="text-xl">{{ genre }}</h2>
      <button class="btn-ghost btn">
        <NuxtLink :to="`/books/${genre}`">View More >> </NuxtLink>
      </button>
      
    </div>
    
    <Carousel
      class=" carousel-center p-4 space-x-4 bg-stone-100 rounded-box w-full"
      :items-to-show="3" :breakpoints="breakpoints"
    >
    <!-- ココを変更する -->
      <Slide v-for="book in books" :key="book.bookid">
        <li class="mb-3 carousel__item card card-compact shadow-xl bg-base-100 w-[80%]">
          <NuxtLink :to="`/books/${book.bookid}-detail`">
            <figure>
              <img src="/img/book_dummy.png" alt="" class="rounded-t-2xl" />
            </figure>
            <div class="card-body">
              <p class="font-bold text-xs xl:text-sm">{{ book.title }}</p>
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

</template>
<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
const { allBooks, booksByGenre, isLoading } = useBookStore();
const breakpoints = {
  900: {
    itemsToShow: 3,
  },
  1600: {
    itemsToShow: 6,
  },
};
</script>

<style scoped>
.carousel__viewport {
  width: 85vw;
}
</style>