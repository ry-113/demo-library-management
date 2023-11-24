<template>
    <h1>{{ genre }}の一覧ページ</h1>
    <ul>
        <li v-for="book in books" :key="book.bookid">
            <p>{{ book.title }}</p>
            <p>{{ book.author }}</p>
        </li>
    </ul>
</template>

<script setup lang="ts">
const route = useRoute();
const genre = route.params.genre;
const { allBooks } = useBookStore();
const books = allBooks.value.filter((book) => book.genre === genre);
</script>