<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
window.addEventListener("unload", () => {
  sessionStorage.clear();
});
</script>

<style scoped>
::view-transition-old(root) {
  animation: 90ms cubic-bezizer(0.4, 0, 1, 1) both fade-out;
}

::view-transition-new(root) {
  animation: 210ms cubic-bezizer(0, 0, 0.2, 1) 90ms both fade-in;
}

.overlay {
  view-transition-name: "overlay";
}

</style>