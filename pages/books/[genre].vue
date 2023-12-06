<template>
  <div>
    <NuxtLayout name="default">
      <template #breadcrumbs>
        <div class="text-sm breadcrumbs">
          <ul>
            <li><NuxtLink to="/books">本棚</NuxtLink></li>
            <li>{{ genre }}</li>
          </ul>
        </div>
      </template>

      <template #default>
        <div>
          <h1 class="text-2xl mt-10 mb-4">{{ genre }}</h1>
          <ul class="flex flex-wrap gap-5 xl:gap-10">
            <li
              v-for="book in books"
              :key="book.bookid"
              class="mb-3 card card-compact shadow-xl bg-base-100 w-[23%] xl:w-[200px]"
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
            </li>
          </ul>
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
const genre = route.params.genre;
const { allBooks } = useBookStore();
const books = allBooks.value.filter((book) => book.genre === genre);
</script>
