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
            <h1 class="text-2xl mt-10 mb-3">{{ book?.title }}</h1>
            <p>著者: {{ book?.author }}</p>
            <p>出版年: {{ book?.year }}</p>
            <p>ジャンル: {{ book?.genre }}</p>
            <ReviewDisplay :rating="3.5" class="mt-3"></ReviewDisplay>

            <div class="action-btns flex absolute bottom-4 right-0 gap-5">
              <button class="btn w-32">レビュー投稿</button>
              <button class="btn w-32">借りる</button>
              <button class="btn w-32">返す</button>
            </div>
          </div>

          <div class="contents--container py-10 flex justify-between items-start">
            <img src="/img/book_dummy.png" alt="" class="w-[45%] xl:w-[35%]" />
            <div class="book--info w-[50%]">
              <ul class="flex gap-3 label--list flex-wrap">
                <li
                  v-for="label in labels"
                  :key="label.name"
                  class="badge badge-lg rounded-md py-4 px-3 text-white"
                  :class="getBgColor(label.color)"
                >
                  {{ label.name }}
                </li>
              </ul>

              <div class="description--box">
                <h2 class="text-xl mt-8 mb-2">説明</h2>
                <p>{{ book?.description }}</p>
              </div>

              <div class="review--box">
                <h2 class="text-xl mt-8 mb-2">レビュー</h2>
                <Carousel :items-to-show="1" :wrap-around="true" :autoplay="5000" :transition="600">
                  <Slide v-for="review in reviews" :key="review.reviewid">
                    <div class="carousel__item bg-zinc-100 p-4 rounded-xl mb-3 text-left">
                      <div class="review--header flex items-center justify-between mb-3">
                        <div class="reviewer-info flex items-center gap-3">
                          <img :src="`${review.photo}`" alt="" class="rounded-full w-10" />
                          <p class="text-lg">{{ review.username }}</p>
                        </div>
                        <p>{{ review.timestamp }}</p>
                      </div>

                      <ReviewDisplay :rating="review.rating" />

                      <div class="review--box mt-6">
                        <h3 class="mb-3">{{ review.title }}</h3>
                        <p>{{ review.description }}</p>
                      </div>
                    </div>
                  </Slide>
                </Carousel>
              </div>
            </div>
          </div>
          <!-- ここにコンテンツが来る -->
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
definePageMeta({
  layout: false,
});
const route = useRoute();
const bookid = route.params.bookid;
const { allBooks } = useBookStore();
const book = allBooks.value.find((book) => book.bookid === bookid);
const labels = computed(() => book?.labels);

const getBgColor = (color: string) => {
  switch (color) {
    case 'red':
      return 'bg-red-400';
    case 'blue':
      return 'bg-blue-400';
    case 'green':
      return 'bg-green-400';
    case 'yellow':
      return 'bg-yellow-400';
    case 'purple':
      return 'bg-purple-400';
  }
};

const { getReviews } = useReviewStore();
const reviews = await getReviews(book?.bookid);

</script>
