<template>
  <!-- slotでボタンの名前と中身のHTMLを記述して、propsで一意のmodal-idを渡す -->
  <div class="btn w-32" :onclick="`${props.modalId}.showModal()`">
    <slot name="actionName">デフォルト</slot>
  </div>
  <dialog :id="`${props.modalId}`" class="modal">
    <div class="modal-box max-w-[900px] p-20">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <slot/>
    </div>
  </dialog>
</template>

<script setup lang="ts">
interface Props {
  modalId: string;
}

const props = defineProps<Props>();
</script>