<template>
    <h1 class="text-3xl mb-10">本の一覧ページです</h1>
    <ul>
        <li v-for="book in allBooks" :key="book.bookid" class="mb-3">
            <NuxtLink :to="`/books/${book.bookid}-detail`">
                <p>{{ book.title }}</p>
                <p>{{ book.author }}</p>
            </NuxtLink>
            
        </li>
    </ul>
</template>
<script setup lang="ts">
const { allBooks } = useBookStore();
</script>