<!-- Open the modal using ID.showModal() method -->
<template>
  <dialog id="full_review" class="modal">
    <div class="modal-box">
        <div class="review--header flex items-center justify-between mb-3">
          <div class="reviewer-info flex items-center gap-3">
            <img :src="`${review?.photo}`" alt="" class="rounded-full w-10" />
            <p class="text-lg">{{ review?.username }}</p>
          </div>
          <p>{{ review?.timestamp }}</p>
        </div>
        <ReviewDisplay :rating="Number(review?.rating)" />
        <div class="review--box mt-6">
          <h3 class="mb-3 font-semibold">{{ review?.title }}</h3>
          <p>{{ review?.description }}</p>
        </div>
      </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
<script setup lang="ts">
interface Props {
  review: Review | null;
}
const { review } = defineProps<Props>();
</script>
