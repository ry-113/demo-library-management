<template>
  <div>
    <span
      v-for="(star, index) in 5"
      :key="index"
      :class="[
        'star',
        index < Math.round(props.rating) ? 'filled' : '',
        index === Math.floor(props.rating) && props.rating % 1 !== 0 ? 'half-filled' : '',
      ]"
      @click="setRating(index + 1)"
      class=""
      >★</span
    >
  </div>
</template>

<script setup lang="ts">

interface Props {
  rating: number;
}
const props = defineProps<Props>();

interface Emits {
  (e: 'update:rating', rating: number): void;
}
const emit = defineEmits<Emits>();
const setRating = (rating: number) => {
  emit('update:rating', rating);
};
</script>

<style scoped>
.star {
  color: #ccc;
  font-size: 25px;
  cursor: pointer;
}
.filled {
  color: gold;
}
.half-filled {
    position: relative;
    color: #ccc;
    &::before {
        content: "★";
        position: absolute;
        left: 0;
        overflow: hidden;
        width: 50%;
        white-space: nowrap;
        color: gold;
    }
}
</style>
