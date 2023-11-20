<template>
    <h1>アプリのトップ画面です</h1>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: ["auth"],
});
</script>