<template>
  <div>
    <NuxtLayout name="default">
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
              <td class="pl-[32px] relative">
                タイプ
                <button class="btn btn-ghost h-[2rem] min-h-[2rem] px-2" @click="toggleMenu">
                  <Icon name="fluent:filter-12-regular" size="1.25rem" />
                </button>
                <ul class="menu bg-base-200 w-60 rounded-box absolute top-16 left-[-20px] shadow-sm transition-all" v-show="isMenuOpen">
                  <li class="menu-title">ユーザータイプを選択してください。</li>
                  <li><a>All</a></li>
                  <li><a>student</a></li>
                  <li><a>instructor</a></li>
                  <li><a>admin</a></li>
                </ul>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="user.uid">
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
                    <Icon name="ant-design:delete-outlined" size="1.4rem" />
                  </template>
                  <p class="text-xl font-semibold mb-2">名前：{{ user.name }}</p>
                  <p class="text-xl">
                    このユーザーを<span class="text-red-500">削除</span
                    >します。本当によろしいですか？
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
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
const { allUsers, isLoading, getAllUsers, changeRole, deleteUser } = useUserStore();
const userRoles = ['student', 'instructor', 'admin'];
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

const isMenuOpen = ref(false);
const toggleMenu = ():void => {
    isMenuOpen.value ? isMenuOpen.value = false : isMenuOpen.value = true;
};

const selectedRole = ref("all");
const filteredUsers = computed(() => {
    if(selectedRole.value === "all") {
        return allUsers.value;
    } else {
        const filteredUsers = allUsers.value.filter(user => user.role === selectedRole.value);
        return filteredUsers;
    }
});
//タイプもドロップダウン使えば解決？
</script>
