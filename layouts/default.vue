<template>
  <div class="navbar fixed top-0 z-10 bg-slate-300 px-6 py-4 justify-between">
    <div class="flex-1">
      <a class="btn btn-ghost text-3xl">Logo</a>
    </div>
    <div class="gap-2">
     <input
        type="text"
        placeholder="本をキーワードで検索"
        class="input input-bordered w-[600px] absolute right-[50%] translate-x-[50%]"
      />
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="flex items-center gap-2 cursor-pointer btn btn-ghost">
          <div class="badge badge-outline">{{ userRole }}</div>
          <p class="user-name">{{ user?.displayName }}さん</p>
          <div class="w-10">
            <img
              alt=""
              :src="`${user?.photoURL}`"
              class="rounded-full"
            />
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a>プロフィール</a>
          </li>
          <li><a>設定</a></li>
          <li @click="logOut"><NuxtLink to="/">ログアウト</NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="drawer sm:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content absolute top-[80px] w-full h-[calc(100vh - 80px)] p-10">
      <slot name="breadcrumbs"/>
      <!-- Page content here -->
      <div class="w-full max-h-[85vh] overflow-y-scroll disable-scrollbars">
        <slot/>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-xl">
        <!-- Sidebar content here -->
        <li class="p-4 mt-28" v-if="userRole === 'student'">
          <NuxtLink :to="`/student/transaction-${user?.uid}`" class="py-3" :class="{'active': $route.path === `/student/transaction-${user?.uid}`}">貸出記録</NuxtLink>
        </li>
        <li class="p-4 mt-28" v-else>
          <NuxtLink to="/instructor/transaction" class="py-3" :class="{'active': $route.path === '/instructor/transaction'}">貸出記録</NuxtLink>
        </li>
        <li class="p-4">
          <NuxtLink to="/books" class="py-3" :class="{'active':  /^\/books/.test($route.path)}">本棚</NuxtLink>
        </li>
        <li class="p-4" v-if="userRole === 'admin' || userRole === 'instructor'">
          <NuxtLink to="/instructor/database" class="py-3" :class="{'active': $route.path === '/instructor/database'}">データベース</NuxtLink>
        </li>
        <li class="p-4" v-if="userRole === 'admin'">
          <NuxtLink to="/admin/user-management" class="py-3" :class="{'active': $route.path === '/admin/user-management'}">ユーザー管理</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import {getAuth} from "firebase/auth"
const auth = getAuth();
const user = auth.currentUser;
const {logOut} = useAuth();

const {getUser} = useAuth();
const getUserRole = async () => {
  if(user != null) {
    const userSnapShot = await getUser(user.uid);
    const userData = userSnapShot.data();
    return userData.role
  }
};

const userRole = await getUserRole();
</script>