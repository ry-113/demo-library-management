<template>
  <div v-if="isLoading" class="w-full h-[85vh] flex justify-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
  <table v-else class="table">
    <thead>
      <tr>
        <td></td>
        <td>名前</td>
        <td>メールアドレス</td>
        <td>権限</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in allUsers" :key="user.uid">
        <th>{{ index + 1 }}</th>
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
          <select class="select select-ghost max-w-[150px] min-w-[130px]" :value="user.role" @change="changeRoleReq($event, user.uid)">
            <option v-for="role in userRoles"  :key="role" :value="role">
                {{ role }}
            </option>
          </select>
          
        </td>
        <td>
          <CommonModal :modal-id="`uid${user.uid}`">
            <template #actionName>
              <Icon name="ant-design:delete-outlined" size="1.4rem" />
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
const { allUsers, isLoading, getAllUsers, changeRole, deleteUser } = useUserStore();
const userRoles = ["student","instructor", "admin"];
const changeRoleReq = async (e:Event, uid:string) => {
    const targetElm = e.target as HTMLSelectElement;
    const newRole = targetElm.value;
    await changeRole(uid, newRole);
    await getAllUsers();
}

const deleteUserReq = async (uid: string) => {
    await deleteUser(uid);
    await getAllUsers();
};

</script>
