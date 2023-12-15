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
          v-for="review in reviews"
          :key="review.reviewid"
        >
          <div class="collapse bg-base-200 mb-5 2xl:w-[70%]">
            <input type="checkbox" />
            <div class="collapse-title text-lg">
              <p>
                {{ $dayjs(review.timestamp.toDate()).format("YYYY/MM/DD") }}
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
              <button class="btn btn-circle">
                <Icon name="fluent:edit-24-regular" size="1.4rem" @click="getBook(review.bookid)"/>
              </button>
            </template>
            <h1 class="text-xl">レビュー編集</h1>
            <p>入力内容を変更し、送信ボタンを押してください。</p>
            <div class="review--form flex items-start mt-10 gap-10">
              <div
                class="text-left card card-compact shadow-xl bg-base-100 w-[35%]"
              >
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
              <form @submit.prevent="submitReview" class="w-[60%]">
                <div class="mb-3">
                  <label for="rating">
                    評価
                    <RatingDisplay
                      :rating="review.rating"
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
                      v-model="review.title"
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
                      v-model="review.description"
                      required
                    ></textarea>
                  </label>
                </div>

                <button type="submit" class="btn block ml-auto">送信</button>
              </form>
            </div>
          </CommonModal>
          <button class="btn btn-circle">
            <Icon name="ant-design:delete-outlined" size="1.4rem" />
          </button>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
const route = useRoute();
const uid = computed(() => route.params.uid as string);
const { getUser } = useAuth();
const { getMyReviews } = useReviewStore();
const userSnapshot = await getUser(uid.value);
const user = userSnapshot.data();
const reviews = await getMyReviews(uid.value);
const { allBooks } = useBookStore();
const selectedBook: Ref<Book | null> = ref(null);
const getBook = (bookid: string) => {
  selectedBook.value = allBooks.value.filter((book) => book.bookid === bookid)[0];
};
</script>
