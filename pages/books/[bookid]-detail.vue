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
            <RatingDisplay :rating="rating" class="mt-3">{{ numOfReviews }}件</RatingDisplay>

            <div class="action--btns flex absolute bottom-4 right-0 gap-5">
              <CommonModal modal-id="review">
                <template #actionName>
                  <button class="btn">レビュー投稿</button>
                </template>
                <h1 class="text-xl">レビュー投稿</h1>
                <p>フォームを入力し、送信ボタンを押してください。</p>
                <div class="review--form flex items-start mt-10 gap-10">
                  <div class="text-left card card-compact shadow-xl bg-base-100 w-[35%]">
                    <figure>
                      <img
                        :src="book?.imageURL || '/img/noimage.png'"
                        alt=""
                        class="rounded-t-2xl"
                      />
                    </figure>
                    <div class="card-body">
                      <p class="font-bold text-xs xl:text-sm">
                        {{ book?.title }}
                      </p>
                      <p class="text-xs">{{ book?.author }}</p>
                    </div>
                  </div>
                  <form @submit.prevent="submitReview" class="w-[60%]">
                    <div class="mb-3">
                      <label for="rating">
                        評価
                        <RatingDisplay
                          :rating="postRating"
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
                          v-model="reviewTitle"
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
                          v-model="reviewContent"
                          required
                        ></textarea>
                      </label>
                    </div>

                    <button type="submit" class="btn block ml-auto">送信</button>
                  </form>
                </div>
              </CommonModal>

              <CommonModal modal-id="borrow">
                <template #actionName>
                  <button class="btn">借りる</button>
                </template>
                <h1 class="text-xl">貸出リクエスト</h1>
                <p>カレンダーから返却予定日を選択してください。</p>
                <p class="text-sm">※1か月以上先は選択できません。</p>
                <div class="review--form flex items-start mt-10 gap-10">
                  <div class="text-left card card-compact shadow-xl bg-base-100 w-[35%]">
                    <figure>
                      <img
                        :src="book?.imageURL || '/img/noimage.png'"
                        alt=""
                        class="rounded-t-2xl"
                      />
                    </figure>
                    <div class="card-body">
                      <p class="font-bold text-xs xl:text-sm">
                        {{ book?.title }}
                      </p>
                      <p class="text-xs">{{ book?.author }}</p>
                    </div>
                  </div>
                  <form @submit.prevent="borrowReq" class="w-[60%]">
                    <DatePicker
                      :datePeriod="datePeriod"
                      @update:model-value="setDatePeriod"
                    ></DatePicker>
                    <button type="submit" class="btn block ml-auto mt-3">送信</button>
                  </form>
                </div>
              </CommonModal>
              <CommonModal modal-id="returnBook">
                <template #actionName>
                  <button class="btn">返す</button>
                </template>
                <h1 class="text-xl mb-3">返却リクエスト</h1>
                <p>この本を返却します。よろしいですか？</p>
                <form @submit.prevent="returnReq">
                  <button type="submit" class="btn block ml-auto mt-3">OK</button>
                </form>
              </CommonModal>
            </div>
          </div>

          <div class="contents--container pt-20 flex justify-between items-start">
            <img
              :src="book?.imageURL || '/img/noimage.png'"
              alt=""
              class="w-[45%] xl:w-[35%] border shadow-lg"
            />
            <div class="book--info w-[50%]">
              <template v-if="labels !== undefined && labels.length !== 0">
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
              </template>
              <template v-else>
                この本にはラベルがついていません。
              </template>
              <div class="description--box">
                <h2 class="text-xl mt-8 xl:mt-12 mb-2">説明</h2>
                <p>{{ book?.description }}</p>
              </div>

              <div class="review--box">
                <h2 class="text-xl mt-8 xl:mt-12 mb-2">レビュー</h2>
                <template v-if="reviews[0]">
                  <p class="mb-8">クリックすると全文を表示できます。</p>
                  <Carousel
                    :items-to-show="1"
                    :wrap-around="true"
                    :autoplay="5000"
                    :transition="800"
                  >
                    <Slide v-for="review in reviews" :key="review.reviewid">
                      <div
                        class="carousel__item bg-zinc-100 p-4 rounded-xl text-left w-[75%] h-[20vh]"
                        @click="showFullReview(review)"
                      >
                        <div class="review--header flex items-center justify-between mb-3">
                          <div class="reviewer-info flex items-center gap-3">
                            <img :src="`${review.photo}`" alt="" class="rounded-full w-10" />
                            <p class="text-lg">{{ review.username }}</p>
                          </div>
                          <p>
                            {{ $dayjs(review.timestamp).format('YYYY/MM/DD') }}
                          </p>
                        </div>
                        <RatingDisplay :rating="Number(review.rating)" />
                        <div class="review--box mt-6 text-overflow-lines">
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
                  <p>レビュー投稿にご協力よろしくお願いします。</p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { getAuth } from 'firebase/auth';
const auth = getAuth();
const user = auth.currentUser;
import 'vue3-carousel/dist/carousel.css';
import type { Review } from '@/composables/useReviewStore';
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

const { getReviews, addReview } = useReviewStore();
const reviews: Review[] = await getReviews(book?.bookid);
const numOfReviews = reviews.length;
//firestoreのレビューコレクションの集計
const rating = computed((): number => {
  let total: number = 0;
  reviews.forEach((review) => (total += Number(review.rating)));
  const ratingAvr = total / numOfReviews;
  const rating = Math.round(ratingAvr * 10) / 10; //小数第2位を四捨五入
  return rating;
});

const selectedReview: Ref<Review | null> = ref(null);
const showFullReview = (review: Review) => {
  selectedReview.value = review;
  document.getElementById('full_review')?.showModal();
};

//本のレビュー投稿
const postRating = ref(0);
const reviewTitle = ref('');
const reviewContent = ref('');
const setRating = (rating: number) => {
  postRating.value = rating;
};
const submitReview = async () => {
  //レビュー評価のバリデーション
  if (!postRating.value) {
    alert('評価を選択してください。');
    return;
  }

  let username, uid, photo;
  if (user) {
    username = user.displayName;
    uid = user.uid;
    photo = user.photoURL;
  }
  const newReview: Review = {
    uid,
    username,
    photo,
    bookid,
    rating: postRating.value,
    title: reviewTitle.value,
    description: reviewContent.value,
    timestamp: new Date().toLocaleString(),
  };
  try {
    await addReview(newReview);
    alert('レビューの投稿が完了しました。');
  } catch {
    alert('レビュー送信中に予期せぬエラーが起きました');
  }
  document.getElementById('review')?.close();
};

//本の貸出・返却
const startDate = new Date();
const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
const datePeriod: Ref<Date[]> = ref([startDate, endDate]);
const setDatePeriod = (value: Date[]) => {
  datePeriod.value = value;
};
const borrowReq = () => {
  console.log(datePeriod.value, user?.uid, user?.displayName, book?.bookid);
  document.getElementById('borrow')?.close();
};

const returnReq = () => {
  const returnDate = new Date();
  console.log(returnDate, user?.uid, user?.displayName, book?.bookid);
  document.getElementById('returnBook')?.close();
};
</script>
