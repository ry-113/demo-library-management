<template>
  <div>
    <NuxtLayout name="default">
      <template #breadcrumbs>
        <div class="text-sm breadcrumbs">
          <ul>
            <li>マイページ ></li>
          </ul>
        </div>
      </template>
      <template #default>
        <div class="grid grid-cols-6 grid-rows-2 gap-4 my-10">
          <div class="col-span-3 row-span-1 2xl:col-span-1">
            <h1 class="text-xl mb-3">プロフィール</h1>
            <div class="card w-full bg-base-200 shadow-md flex justify-center py-10">
              <div class="bg-[#4285f4] block w-full h-[80px] absolute top-0 right-[50%] translate-x-[50%] rounded-t-3xl"></div>
              <figure class="z-10">
                <div class="avatar">
                  <div class="w-20 mask mask-squircle">
                    <img :src="`${user.photo}`" />
                  </div>
                </div>
              </figure>
              <div class="card-body mx-auto text-center z-10">
                <h2 class="text-xl">{{ user.name }}</h2>
                <div class="badge badge-outline mx-auto">
                  <p>{{ user.role }}</p>
                </div>
                <p>{{ user.email }}</p>
              </div>
            </div>
          </div>
          
          <div class="col-span-6 row-span-1 row-start-2 2xl:col-span-4">
            <h1 class="text-xl mt-6 mb-3">{{ user.name }}さんのレビュー</h1>
             <div class="review--box card bg-base-200 shadow-md px-4 py-8">
                <div class="section--header flex justify-between items-center pr-8 mb-3">
            <button class="btn-ghost btn p-0 block ml-auto">
              <NuxtLink :to="`/mypage/${user.uid}-review`" class="py-4 px-2">レビューの編集・削除 >> </NuxtLink>
            </button>
          </div>
                <template v-if="myReviews[0]">
                  <p class="mb-8">クリックすると全文を表示できます。</p>
                  <Carousel
                    :breakpoints="breakpoints"
                  >
                    <Slide v-for="review in myReviews" :key="review.reviewid">
                      <div
                        class="carousel__item bg-base-100 p-4 rounded-xl text-left w-[85%]"
                        @click="showFullReview(review)"
                      >
                        <div class="review--header flex items-center justify-between mb-3">
                          <div class="reviewer-info flex items-center gap-3">
                            <img :src="`${review.photo}`" alt="" class="rounded-full w-10" />
                            <p class="text-lg">{{ review.username }}</p>
                          </div>
                          <p>
                            {{ $dayjs(review.timestamp.toDate()).format('YYYY/MM/DD') }}
                          </p>
                        </div>
                        <RatingDisplay :rating="Number(review.rating)" />
                        <div class="review--box mt-6 text-overflow-lines-4">
                          <h3 class="mb-3 font-semibold">{{ review.title }}</h3>
                          <p>{{ review.description }}</p>
                        </div>
                      </div>
                    </Slide>
                    <template #addons>
                      <Navigation />
                    </template>
                  </Carousel>
                  <ReviewModal :review="selectedReview" />
                </template>
                <template v-else>
                  <p class="text-center text-gray-500 pt-10 pb-24">現在レビューがありません。</p>
                </template>
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
  middleware: ['auth'],
});

const route = useRoute();
const uid = computed(() => route.params.uid as string);
const { getUser } = useAuth();
const {getMyReviews, myReviews} = useReviewStore();
const userSnapshot = await getUser(uid.value);
const user = userSnapshot.data();
await getMyReviews(uid.value);

const selectedReview: Ref<Review | null> = ref(null);
const showFullReview = (review: Review) => {
  selectedReview.value = review;
  document.getElementById('full_review')?.showModal();
};
const breakpoints = {
  700: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  1280: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
};
</script>
