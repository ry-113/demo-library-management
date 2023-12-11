<template>
  <div>{{ result }}</div>
</template>

<script setup lang="ts">
import algoliaserch from "@nuxtjs/algolia"
const { result, search } = useAlgoliaSearch('book')

onMounted(async () => {
  await search({ query: 'Jimmie' })
});

const objects = [{
  firstname: 'Jimmie',
  lastname: 'Barninger',
  objectID: 'myID1'
}, {
  firstname: 'Warren',
  lastname: 'Speach',
  objectID: 'myID2'
}];


const index = useAlgoliaInitIndex("book");
console.log(index);
await index.saveObjects(objects);
</script>

