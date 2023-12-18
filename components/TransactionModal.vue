<template>
  <dialog :id="`transaction-${transaction.transactionid}`" class="modal">
    <div class="modal-box max-w-[900px] p-20 text-left text-lg">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <form @submit.prevent="approveReq(transaction.status)">
        <div class="flex justify-between items-start">
          <div class="left w-[50%]">
            <div class="flex items-center gap-3 mb-7 text-xl mt-7">
              <div class="avatar">
                <div class="mask mask-squircle w-8 h-8">
                  <img :src="`${transaction.userPhoto}`" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ transaction.userName }}</div>
              </div>
            </div>
            <p class="text-xl mb-2">
              <span
                class="w-4 h-4 rounded-full inline-block ml-1 mr-2"
                :class="getStatusColor(transaction.status)"
              ></span
              >{{ transaction.status }}
            </p>
            <p class="text-xl mb-2"><Icon name="fluent:book-open-28-regular" size="1.5rem" class="mr-1 mb-1"/>{{ transaction.bookTitle }}</p>
            <div class="mt-2">
              <ul class="steps steps-primary steps-vertical min-w-full mt-5">
                <li
                  class="step step-primary font-semibold mb-10"
                  data-content="●"
                >
                  {{
                    transaction.status === "貸出確認" ? "貸出日: " : "返却日: "
                  }}{{
                    $dayjs(transaction.nowdate.toDate()).format("YYYY/MM/DD")
                  }}
                </li>
                <li class="step step-primary font-semibold" data-content="●">
                  返却予定日:
                  {{
                    $dayjs(transaction.duedate.toDate()).format("YYYY/MM/DD")
                  }}
                </li>
              </ul>
              <p></p>
              <p v-if="transaction.status === '貸出確認'"></p>
            </div>
          </div>

          <img
            src="/img/undraw_Confirmation.png"
            class="w-[55%] object-contain"
          />
        </div>

        <button class="btn btn-primary block ml-auto w-[100px]">承認</button>
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
  (e: "approveBorrowReq", transaction: Transaction): void;
  (e: "approveReturnReq", transaction: Transaction): void;
}
const emit = defineEmits<Emits>();
const approveReq = (status: string) => {
  if (status === "貸出確認") {
    emit("approveBorrowReq", transaction);
  } else {
    emit("approveReturnReq", transaction);
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "貸出確認":
      return "bg-orange-400";
    case "返却確認":
      return "bg-purple-400";
  }
};
</script>
