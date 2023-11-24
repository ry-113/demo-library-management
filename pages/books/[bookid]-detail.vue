<template>
    <h1>{{ book.title }}の詳細ページ</h1>
</template>

<script setup lang="ts">
const route = useRoute();
const bookid = route.params.bookid;
const { allBooks } = useBookStore();
const book = allBooks.value.find((book) => book.bookid === bookid);
</script>