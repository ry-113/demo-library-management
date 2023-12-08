<template>
  <div>
    <NuxtLayout name="default">
      <template #table-header>
        <label for="role-filter">
          <div class="inline-block mr-2">フィルタ<Icon name="fluent:filter-12-regular" class="ml-2"/></div>
          <select
            class="select select-bordered max-w-[130px] min-w-[130px] mb-3"
            v-model="selectedRole"
            id="role-filter"
          >
            <option selected>すべて</option>
            <option v-for="role in userRoles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </label>
      </template>
      <template #default>
        <div v-if="isLoading" class="w-full h-[85vh] flex justify-center">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
        <table v-else class="table table-pin-rows">
          <thead class="text-sm">
            <tr>
              <td></td>
              <td>名前</td>
              <td>メールアドレス</td>
              <td class="pl-[32px] relative">ユーザータイプ</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="user.uid">
              <th>{{ index + 1 }}</th>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-8 h-8">
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
                <select
                  class="select select-ghost max-w-[150px] min-w-[130px]"
                  :value="user.role"
                  @change="changeRoleReq($event, user.uid)"
                >
                  <option v-for="role in userRoles" :key="role" :value="role">
                    {{ role }}
                  </option>
                </select>
              </td>
              <td>
                <CommonModal :modal-id="`uid${user.uid}`">
                  <template #actionName>
                    <button class="btn btn-ghost">
                      <Icon name="ant-design:delete-outlined" size="1.4rem" />
                    </button>
                    
                  </template>
                  <p class="text-xl font-semibold mb-2">
                    名前：{{ user.name }}
                  </p>
                  <p class="text-xl">
                    このユーザーを<span class="text-red-500">削除</span
                    >します。本当によろしいですか？
                  </p>
                  <form @submit.prevent="deleteUserReq(user.uid)">
                    <button type="submit" class="btn block ml-auto mt-3">
                      OK
                    </button>
                  </form>
                </CommonModal>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
const { allUsers, isLoading, getAllUsers, changeRole, deleteUser } =
  useUserStore();
const userRoles = ["student", "instructor", "admin"];
const changeRoleReq = async (e: Event, uid: string) => {
  const targetElm = e.target as HTMLSelectElement;
  const newRole = targetElm.value;
  await changeRole(uid, newRole);
  await getAllUsers();
};

const deleteUserReq = async (uid: string) => {
  await deleteUser(uid);
  await getAllUsers();
};

const selectedRole = ref("すべて");
const filteredUsers = computed(() => {
  if (selectedRole.value === "すべて") {
    return allUsers.value;
  } else {
    const filteredUsers = allUsers.value.filter(
      (user) => user.role === selectedRole.value
    );
    return filteredUsers;
  }
});
//タイプもドロップダウン使えば解決？
</script>
