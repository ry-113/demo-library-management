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
        <div class="grid grid-cols-6 grid-rows-5 gap-4 min-h-[75vh] my-10">
          <div class="col-span-4 row-span-2 2xl:col-span-2">
            <h1 class="text-xl">プロフィール</h1>
            <div class="card w-full bg-base-100 shadow-xl flex-row p-4">
              <figure>
                <div class="avatar">
                  <div class="w-20 mask mask-squircle">
                    <img :src="`${user.photo}`" />
                  </div>
                </div>
              </figure>
              <div class="card-body">
                <div class="badge badge-outline">
                  <p>{{ user.role }}</p>
                </div>
                <h2>{{ user.name }}</h2>
                <p>{{ user.email }}</p>
              </div>
            </div>
          </div>
          <div class="col-span-6 row-span-3 row-start-3 2xl:col-span-4">
             <div class="review--box card bg-base-100 shadow-xl px-4 py-16">
                <div class="section--header flex justify-between items-center pr-8 mb-3">
            <h2 class="text-xl">{{ user.name }}さんのレビュー</h2>
            <button class="btn-ghost btn p-0">
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
                        class="carousel__item bg-zinc-100 p-4 rounded-xl text-left w-[85%]"
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
                  <p>現在レビューがありません。</p>
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
