<template>
  <dialog :id="`transaction-${transaction.transactionid}`" class="modal">
    <div class="modal-box max-w-[900px] p-20 text-left text-lg">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <form @submit.prevent="approveReq(transaction.status)">
        <div class="flex items-center gap-3 mb-3 text-xl">
          <div class="avatar">
            <div class="mask mask-squircle w-8 h-8">
              <img :src="`${transaction.userPhoto}`" />
            </div>
          </div>
          <div>
            <div class="font-bold">{{ transaction.userName }}</div>
          </div>
        </div>
        <p class="text-xl">本のタイトル: {{ transaction.bookTitle }}</p>
        <p class="text-xl">ステータス: {{ transaction.status }}</p>
        <div>
          <ul class="steps steps-vertical min-w-full">
            <li class="step step-primary" data-content="●">
              {{ transaction.status === '貸出確認' ? '貸出日: ' : '返却日: '
              }}{{ $dayjs(transaction.nowdate).format('YYYY/MM/DD') }}
            </li>
            <li class="step step-primary" data-content="●">
              返却予定日: {{ $dayjs(transaction.duedate).format('YYYY/MM/DD') }}
            </li>
          </ul>
          <p></p>
          <p v-if="transaction.status === '貸出確認'"></p>
        </div>
        <button class="btn block ml-auto">承認</button>
      </form>
    </div>
  </dialog>
</template>
<script setup lang="ts">
interface Props {
  transaction: Transaction;
}
const { transaction } = defineProps<Props>();

interface Emits {
  (e: 'approveBorrowReq', transaction: Transaction): void;
  (e: 'approveReturnReq', transaction: Transaction): void;
}
const emit = defineEmits<Emits>();
const approveReq = (status: string) => {
  if (status === '貸出確認') {
    emit('approveBorrowReq', transaction);
  } else {
    emit('approveReturnReq', transaction);
  }
};
</script>
