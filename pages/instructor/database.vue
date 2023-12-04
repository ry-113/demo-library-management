<template>
  <div>
    <NuxtLayout name="default">
      <template #table-header> ここにヘッダー </template>
      <template #default>
        <div v-if="isLoading" class="w-full h-[85vh] flex justify-center">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
        <table v-else class="table table-pin-rows">
          <thead class="text-sm">
            <tr>
              <td></td>
              <td>タイトル</td>
              <td>著者名</td>
              <td>出版年</td>
              <td>ジャンル</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in allBooks" :key="book.bookid" class="hover cursor-pointer">
              <th>{{ index + 1 }}</th>
              <td>
                {{ book.title }}
              </td>
              <td>
                {{ book.author }}
              </td>
              <td>
                {{ book.year }}
              </td>
              <td>
                {{ book.genre }}
              </td>
              <td>
                <Icon name="ant-design:delete-outlined" size="1.4rem" />
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { allBooks, isLoading, getAllBooks } = useBookStore();
</script>
