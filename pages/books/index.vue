<template>
    <p>本の一覧ページです</p>
</template>
<script setup lang="ts">
const { getAllBooks } = useBookStore();
const allBooks = await getAllBooks();
console.log(allBooks);
</script>