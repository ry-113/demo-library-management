<template>
  <div>
    <NuxtLayout name="default">
      <template #breadcrumbs>
        <div class="text-sm breadcrumbs">
          <ul>
            <li>マイページ ></li>
          </ul>
        </div>
      </template>
      <template #default>
        
<div class="grid grid-cols-6 grid-rows-6 gap-4 min-h-[80vh]">
    <div class="col-span-4 row-span-2">1</div>
    <div class="col-span-2 row-span-6 col-start-5">2</div>
    <div class="col-span-4 row-span-4 row-start-3">3</div>
</div>
    
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth'],
});

const route = useRoute();
const uid = computed(() => route.params.uid);
</script>
