<template>
  <div>
    <NuxtLayout name="default">
      <template #table-header>
        <div class="flex justify-between items-center">
          <label for="status-filter">
            <div class="inline-block mr-2">
              フィルタ<Icon name="fluent:filter-12-regular" class="ml-2" />
            </div>
            <select
              class="select select-bordered max-w-[130px] min-w-[130px] mb-3"
              v-model="selectedStatus"
              id="status-filter"
            >
              <option selected>すべて</option>
              <option v-for="status in allStatus" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
          </label>
        </div>
      </template>
      <template #default>
        <div v-if="isLoading" class="w-full h-[85vh] flex justify-center">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
        <table v-else class="table table-pin-rows">
          <thead class="text-sm">
            <tr>
              <td></td>
              <td>日時</td>
              <td>名前</td>
              <td>本のタイトル</td>
              <td>ステータス</td>
              <td>返却期限</td>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(transaction, index) in filteredTransactions"
              :key="transaction.transactionid"
            >
              <tr
                class="hover cursor-pointer"
                @click="showTransactionModal(transaction)"
              >
                <th>{{ index + 1 }}</th>
                <td>
                  {{ $dayjs(transaction.nowdate.toDate()).format("YYYY/MM/DD") }}
                </td>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-8 h-8">
                        <img :src="`${transaction.userPhoto}`" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{{ transaction.userName }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {{ transaction.bookTitle }}
                </td>
                <td>
                  <span
                    class="w-3 h-3 rounded-full inline-block mr-2"
                    :class="getStatusColor(transaction.status)"
                  ></span
                  >{{ transaction.status }}
                </td>
                <td>
                  {{ $dayjs(transaction.duedate.toDate()).format("YYYY/MM/DD") }}
                </td>
                <TransactionModal
                  :transaction="transaction"
                  @approve-borrow-req="approveBorrowReq"
                  @approve-return-req="approveReturnReq"
                />
              </tr>
            </template>
          </tbody>
        </table>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"]
});
onMounted(() => {
  getAllTransactions();
});

const { isLoading, allTransactions, getAllTransactions } =
  useTransactionStore();
const allStatus = ["貸出確認", "貸出中", "返却確認", "返却済み", "期限切れ"];
const selectedStatus: Ref<string | null> = ref("すべて");
const getStatusColor = (status: string) => {
  switch (status) {
    case "貸出確認":
      return "bg-orange-400";
    case "貸出中":
      return "bg-green-400";
    case "返却確認":
      return "bg-purple-400";
    case "返却済み":
      return "bg-blue-400";
    case "期限切れ":
      return "bg-red-400";
  }
};

const filteredTransactions = computed(() => {
  if (selectedStatus.value === "すべて") {
    return allTransactions.value;
  } else {
    const filteredTransactions = allTransactions.value.filter(
      (transaction) => transaction.status === selectedStatus.value
    );
    return filteredTransactions;
  }
});

const selectedTransaction: Ref<Transaction | null> = ref(null);
const showTransactionModal = (transaction: Transaction) => {
  selectedTransaction.value = transaction;
  if (transaction.status === "貸出確認" || transaction.status === "返却確認") {
    document
      .getElementById(`transaction-${transaction.transactionid}`)
      ?.showModal();
  }
};

const { borrowBook, returnBook } = useTransactionStore();
const approveBorrowReq = async (transaction: Transaction) => {
  await borrowBook(transaction);
  await getAllTransactions();
  document.getElementById(`transaction-${transaction.transactionid}`)?.close();
};
const approveReturnReq = async (transaction: Transaction) => {
  await returnBook(transaction);
  await getAllTransactions();
  document.getElementById(`transaction-${transaction.transactionid}`)?.close();
};
</script>
