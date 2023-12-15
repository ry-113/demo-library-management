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
        <div class="grid grid-cols-6 grid-rows-6 gap-4 min-h-[80vh] my-10">
          <div class="col-span-4 row-span-2">
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
          <div class="col-span-4 row-span-4 row-start-3">
            <h1 class="text-xl">自分が投稿したレビュー</h1>
            <ul class="menu bg-base-100 w-full rounded-box">
              <li v-for="review in myReview">
                {{ review }}
              </li>
            </ul>
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
const {getMyReviews} = useReviewStore();
const userSnapshot = await getUser(uid.value);
const user = userSnapshot.data();
const myReview = await getMyReviews(uid.value);
</script>
