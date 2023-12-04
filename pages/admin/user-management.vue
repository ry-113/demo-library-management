<template>
  <div v-if="isLoading" class="w-full h-[85vh] flex justify-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
  <table v-else class="table">
    <thead>
      <tr>
        <td>ユーザーID</td>
        <td>名前</td>
        <td>メールアドレス</td>
        <td>権限</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in allUsers" :key="user.uid">
        <th>{{ user.uid }}</th>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img
                  :src="`${user.photo}`"
                />
              </div>
            </div>
            <div>
              <div class="font-bold">{{ user.name }}</div>
            </div>
          </div>
        </td>
        <td>
            {{ user.email }}
        </td>
        <td>
            {{ user.role }}
        </td>
        <td>
         ◇
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup langg="ts">
const { allUsers, isLoading, getAllUsers } = useUserStore();
</script>
