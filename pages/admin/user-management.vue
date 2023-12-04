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
                <img :src="`${user.photo}`" />
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
          <CommonModal :modal-id="user.uid">
            <template #actionName>
              <Icon name="ant-design:delete-outlined" size="1.4rem"/>
            </template>
            <p class="text-xl font-semibold mb-2">名前：{{ user.name }}</p>
            <p class="text-xl">
              このユーザーを<span class="text-red-500">削除</span>します。本当によろしいですか？
            </p>
            <form @submit.prevent="deleteUserReq(user.uid)">
              <button type="submit" class="btn block ml-auto mt-3">OK</button>
            </form>
          </CommonModal>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const { allUsers, isLoading, getAllUsers, deleteUser } = useUserStore();

const deleteUserReq = async (uid: string) => {
    try{
      await deleteUser(uid);
      await getAllUsers(); 
    } catch(error) {
        console.error(error);
    }
}
</script>
