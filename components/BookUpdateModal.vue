<template>
  <dialog :id="`book-${book?.bookid}`" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <p>{{ book?.title }}の編集画面</p>
    </div>
  </dialog>
</template>

<script setup lang="ts">
interface Props {
    book: Book | null;
}
const {book} = defineProps<Props>();
</script>