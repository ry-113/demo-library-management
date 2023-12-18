<template>
  <div>
    <NuxtLayout name="default">
      <template #breadcrumbs>
        <div class="text-sm breadcrumbs">
          <ul>
            <li>本棚 > </li>
          </ul>
        </div>
      </template>

      <template #default>
        <div v-if="isLoading" class="w-full h-[85vh] flex justify-center">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
        <div
          v-else
          v-for="[genre, books] in Object.entries(booksByGenre)"
          :key="genre"
          class="px-5 relative w-full mb-12"
        >
          <div class="section--header flex justify-between items-center pr-8 mb-3">
            <h1 class="text-2xl">{{ genre }}</h1>
            <button class="btn-ghost btn p-0">
              <NuxtLink :to="`/books/${genre}`" class="py-4 px-2">View More >> </NuxtLink>
            </button>
          </div>

          <Carousel
            class="carousel-center p-4 space-x-4 bg-base-200 rounded-box w-full"
            :items-to-show="3"
            :breakpoints="breakpoints"
          >
            <Slide v-for="book in books" :key="book.bookid">
              <li class="mb-3 carousel__item text-left card card-compact shadow-xl bg-base-100 w-[80%]">
                <NuxtLink :to="`/books/${book.bookid}-detail`">
                  <figure>
                    <img :src="book.imageURL || '/img/noimage.png'" alt="" class="rounded-t-2xl " />
                  </figure>
                  <div class="card-body">
                    <p class="font-bold text-xs xl:text-sm">{{ book.title }}</p>
                    <p class="text-xs">{{ book.author }}</p>
                  </div>
                </NuxtLink>
              </li>
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
definePageMeta({
  layout: false,
  middleware: ["auth"]
});
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
