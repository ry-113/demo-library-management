<template>
  <div
    class="navbar min-h-[2rem] fixed top-0 z-10 bg-primary text-white px-6 py-2 justify-between"
  >
    <div class="flex-1 navbar-start">
      <a class="btn btn-ghost text-3xl">Logo</a>
    </div>
    <div class="navbar-end gap-3">
      <div class="dropdown dropdown-end">
        <label
          tabindex="0"
          class="flex items-center gap-2 cursor-pointer btn btn-ghost"
        >
          <div class="badge badge-outline">{{ userRole }}</div>
          <p class="user-name">{{ user?.displayName }}さん</p>
          <div class="w-10">
            <img alt="" :src="`${user?.photoURL}`" class="rounded-full" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-base-content"
        >
          <li><NuxtLink :to="`/mypage/${user?.uid}`"><Icon name="fa6-regular:address-card" size="1rem" />マイページ</NuxtLink></li>
          <li @click="logOut" class="text-red-400"><NuxtLink to="/"><Icon name="majesticons:door-exit-line" size="1rem" />ログアウト</NuxtLink></li>
        </ul>
      </div>
      <button class="btn btn-ghost btn-circle inline-block p-2" @click="navigateTo('/books/search', {replace: true})">
        <Icon name="ant-design:search-outlined" size="1.5rem" />
      </button>
    </div>
  </div>

  <div class="drawer sm:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div
      class="drawer-content absolute top-[70px] w-full h-[calc(100vh - 70px)] py-3 px-10"
    >
      <slot name="breadcrumbs" />
      <slot name="table-header" />
      <!-- Page content here -->
      <div class="w-full max-h-[85vh] overflow-y-scroll disable-scrollbars">
        <slot />
      </div>
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul
        class="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-xl"
      >
        <!-- Sidebar content here -->
        <li class="p-4 mt-28" v-if="userRole === 'student'">
          <NuxtLink
            :to="`/student/transaction-${user?.uid}`"
            class="py-3"
            :class="{
              active: $route.path === `/student/transaction-${user?.uid}`,
            }"
            ><Icon
              name="material-symbols-light:contract-edit"
              size="1.75rem"
            />貸出記録</NuxtLink
          >
        </li>
        <li class="p-4 mt-28" v-else>
          <NuxtLink
            to="/instructor/transaction"
            class="py-3"
            :class="{ active: $route.path === '/instructor/transaction' }"
            ><Icon
              name="material-symbols-light:contract-edit"
              size="1.75rem"
            />貸出記録</NuxtLink
          >
        </li>
        <li class="p-4">
          <NuxtLink
            to="/books"
            class="py-3"
            :class="{ active: /^\/books/.test($route.path) }"
            ><Icon name="mingcute:book-5-line" size="1.75rem" />本棚</NuxtLink
          >
        </li>
        <li
          class="p-4"
          v-if="userRole === 'admin' || userRole === 'instructor'"
        >
          <NuxtLink
            to="/instructor/database"
            class="py-3"
            :class="{ active: $route.path === '/instructor/database' }"
            ><Icon
              name="fluent:book-database-20-regular"
              size="1.75rem"
            />書籍管理</NuxtLink
          >
        </li>
        <li class="p-4" v-if="userRole === 'admin'">
          <NuxtLink
            to="/admin/user-management"
            class="py-3"
            :class="{ active: $route.path === '/admin/user-management' }"
            ><Icon
              name="material-symbols:person-edit-outline"
              size="1.75rem"
            />ユーザー管理</NuxtLink
          >
        </li>
        <li class="p-4">
          <NuxtLink
            :to="`/mypage/${user?.uid}`"
            class="py-3"
            :class="{ active: /^\/mypage/.test($route.path) }"
            ><Icon name="fa6-regular:address-card" size="1.75rem" />マイページ</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth } from "firebase/auth";
const auth = getAuth();
const user = auth.currentUser;
const { logOut } = useAuth();

const { getUser } = useAuth();
const getUserRole = async () => {
  if (user != null) {
    const userSnapShot = await getUser(user.uid);
    const userData = userSnapShot.data();
    return userData.role;
  }
};

const userRole = await getUserRole();
</script>
