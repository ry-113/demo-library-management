<template>
  <div class="text-center py-[40vh]">
    <h1 class="text-3xl">ようこそ、{{ displayName }}さん</h1>
    <button class="btn mt-10 inline-block p-0">
      <NuxtLink class="block py-4 px-8" :to="`/student/transaction-${user?.uid}`">はじめる</NuxtLink>
    </button>
  </div>
</template>

<script setup lang="ts">
import { getAuth } from 'firebase/auth';

definePageMeta({
  middleware: ['auth'],
  layout: false,
});
const displayName = useState('displayName');
const auth = getAuth();
const user = auth.currentUser;
</script>
