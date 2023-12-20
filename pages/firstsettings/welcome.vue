<template>
  <div class="w-full h-5 bg-[#4285f4] absolute progress--bar"></div>
  <div class="text-center py-[40vh]">
    <h1 class="text-3xl">ようこそ、{{ displayName }}さん</h1>
    <button class="btn btn-primary mt-10 inline-block p-0">
      <NuxtLink class="block py-4 px-8" :to="`/student/transaction-${user?.uid}`"
        >はじめる</NuxtLink
      >
    </button>
  </div>
</template>

<script setup lang="ts">
import { getAuth } from 'firebase/auth';
import confetti from "canvas-confetti"

definePageMeta({
  middleware: ['auth'],
  layout: false,
});
const displayName = useState('displayName');
const auth = getAuth();
const user = auth.currentUser;
confetti({
  particleCount: 200,
  spread: 150,
  origin: { y: 0.5 }
});
</script>

<style scoped>
.progress--bar {
  view-transition-name: progress-bar;
}

::view-transition-old(progress-bar),
::view-transition-new(progress-bar) {
  width: auto;
  animation-delay: 200ms;
  animation-duration: 600s;
  animation-timing-function: cubic-bezier(0.550, 0.085, 0.680, 0.530);
}
</style>
