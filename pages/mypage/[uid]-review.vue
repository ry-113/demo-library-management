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
        <h1 class="text-xl mt-5 mb-2">{{user.name}}さんのすべてのレビュー</h1>
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
          <button class="btn btn-circle">
            <Icon name="fluent:edit-24-regular" size="1.4rem" />
          </button>
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
</script>
