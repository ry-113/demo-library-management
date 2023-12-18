<template>
  <div>
    <NuxtLayout name="default">
      <template #breadcrumbs>
        <div class="text-sm breadcrumbs">
          <ul>
            <li><NuxtLink :to="`/mypage/${user.uid}`">マイページ</NuxtLink></li>
            <li>すべてのレビュー</li>
          </ul>
        </div>
      </template>
      <template #default>
        <h1 class="text-xl mt-5 mb-2">{{ user.name }}さんのすべてのレビュー</h1>
        <p class="mb-8">ここでレビューの編集・削除が行えます。</p>
        <div
          class="flex gap-4 justify-center items-center"
          v-for="review in myReviews"
          :key="review.reviewid"
        >
          <div class="collapse bg-base-200 mb-5 2xl:w-[70%]">
            <input type="checkbox" />
            <div class="collapse-title text-lg">
              <p>
                {{ $dayjs(review.timestamp.toDate()).format('YYYY/MM/DD') }}
              </p>
              <p>{{ review.title }}</p>
              <RatingDisplay :rating="Number(review.rating)" />
            </div>
            <div class="collapse-content">
              <p>{{ review.description }}</p>
            </div>
          </div>
          <CommonModal :modal-id="`review-${review.reviewid}`">
            <template #actionName>
              <button class="btn btn-circle" @click="selectReview(review)">
                <Icon name="fluent:edit-24-regular" size="1.4rem" />
              </button>
            </template>
            <h1 class="text-xl">レビュー編集</h1>
            <p>入力内容を変更し、送信ボタンを押してください。</p>
            <div class="review--form flex items-start mt-10 gap-10">
              <div class="text-left card card-compact shadow-xl bg-base-100 w-[35%]">
                <figure>
                  <img
                    :src="selectedBook?.imageURL || '/img/noimage.png'"
                    alt=""
                    class="rounded-t-2xl"
                  />
                </figure>
                <div class="card-body">
                  <p class="font-bold text-xs xl:text-sm">
                    {{ selectedBook?.title }}
                  </p>
                  <p class="text-xs">{{ selectedBook?.author }}</p>
                </div>
              </div>
              <form @submit.prevent="updateReviewReq" class="w-[60%]">
                <div class="mb-3">
                  <label for="rating">
                    評価
                    <RatingDisplay
                      :rating="selectedReview.rating"
                      id="rating"
                      @update:rating="setRating"
                    />
                  </label>
                </div>
                <div class="mb-3">
                  <label for="title">
                    レビュータイトル
                    <input
                      type="text"
                      placeholder="タイトルを20文字以内で入力してください"
                      class="input input-bordered w-full"
                      id="title"
                      v-model="selectedReview.title"
                      required
                    />
                  </label>
                </div>
                <div class="mb-3">
                  <label for="content">
                    内容
                    <textarea
                      class="textarea textarea-bordered w-full text-base h-[200px]"
                      placeholder="500文字以内で入力してください"
                      id="content"
                      v-model="selectedReview.description"
                      required
                    ></textarea>
                  </label>
                </div>

                <button type="submit" class="btn block ml-auto">送信</button>
              </form>
            </div>
          </CommonModal>
          <button class="btn btn-circle" @click="deleteReviewReq(review)">
            <Icon name="ant-design:delete-outlined" size="1.4rem" />
          </button>
        </div>
        <button class="btn block mx-auto my-5" @click="fetchNextPageOfUser(uid)" v-if="lastVisible">
          さらに読み込む
        </button>
        <p class="text-gray-500 flex justify-center my-5" v-else>
          これ以上表示できるコンテンツはありません。
        </p>
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
const { myReviews, lastVisible, fetchNextPageOfUser, getMyReviews, updateReview, deleteReview } =
  useReviewStore();
const userSnapshot = await getUser(uid.value);
const user = userSnapshot.data();
await getMyReviews(uid.value);
const { allBooks } = useBookStore();

const selectReview = (review: Review) => {
  selectedReview.value = review;
};
const selectedReview: Ref<Review> = ref({
  reviewid: '',
  username: '',
  bookid: '',
  uid: '',
  timestamp: new Date(),
  photo: '',
  rating: 0,
  title: '',
  description: '',
});
const selectedBook = computed(() => {
  const bookid = selectedReview.value?.bookid;
  return allBooks.value.find((book) => book.bookid === bookid);
});
const setRating = (rating: number) => {
  if (selectedReview.value != undefined) {
    selectedReview.value.rating = rating;
  }
};

const updateReviewReq = async () => {
  await updateReview(selectedReview.value);
  await getMyReviews(uid.value);
  document.getElementById(`review-${selectedReview.value.reviewid}`)?.close();
};

const deleteReviewReq = async (review: Review) => {
  const answer = confirm(`「${review.title}」のレビューを削除します。よろしいですか？`);
  if (answer) {
    await deleteReview(review.reviewid);
    await getMyReviews(uid.value);
  }
};
</script>
