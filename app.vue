<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
window.addEventListener('unload', () => {
  sessionStorage.clear();
});
</script>