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
              <td>本のタイトル</td>
              <td>ステータス</td>
              <td>返却期限</td>
            </tr>
          </thead>
          <tbody v-if="filteredTransactions.length === 0">
            <tr>
              <td colspan="5">
                <p class="flex justify-center py-40 text-gray-500">現在行われている取引はありません</p>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <template
              v-for="(transaction, index) in filteredTransactions"
              :key="transaction.transactionid"
            >
              <tr
                class="hover cursor-pointer" @click="transaction.status === '貸出確認' || transaction.status === '返却確認' ? cancelReq(transaction) : moveToDetailPage(transaction.bookid) "
              >
                <th>{{ index + 1 }}</th>
                <td>
                  {{ $dayjs(transaction.nowdate).format("YYYY/MM/DD") }}
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
                  {{ $dayjs(transaction.duedate).format("YYYY/MM/DD") }}
                </td>
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
  middleware: ["auth"],
  layout: false,
});
const route = useRoute();
const uid = route.params.uid;
onMounted(() => {
  getMyTransactions(uid);
});
const { isLoading, getMyTransactions, myTransactions } = useTransactionStore();
const allStatus = ['貸出確認', '貸出中', '返却確認', '返却済み', '期限切れ'];
const selectedStatus: Ref<string | null> = ref("すべて");
const getStatusColor = (status: string) => {
  switch (status) {
    case '貸出確認':
      return 'bg-orange-400';
    case '貸出中':
      return 'bg-green-400';
    case '返却確認':
      return 'bg-purple-400';
    case '返却済み':
      return 'bg-blue-400';
    case '期限切れ':
      return 'bg-red-400';
  }
};
const filteredTransactions = computed(() => {
  if (selectedStatus.value === 'すべて') {
    return myTransactions.value;
  } else {
    const filteredTransactions = myTransactions.value.filter((transaction) => transaction.status === selectedStatus.value);
    return filteredTransactions;
  }
});

const {cancelTransaction} = useTransactionStore();
const cancelReq = async (transaction: Transaction) => {
  const answer = confirm(`${transaction.status}リクエストをキャンセルしますか？`);
  if(answer) {
    await cancelTransaction(transaction);
    await getMyTransactions(uid);
  }
};

const moveToDetailPage = async (bookid: string) => {
  await navigateTo(`/books/${bookid}-detail`, {replace: true});
};
</script>
