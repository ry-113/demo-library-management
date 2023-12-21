<script setup lang="ts">
const logIn = () => {
    const {logIn} = useAuth()
    logIn();
};
</script>
<template>
    <header
    class="header min-h-[8vh] bg-primary text-white flex justify-between items-center px-10"
  >
    <div class="flex items-center">
      <h1 class="font-bold text-2xl mr-20"><NuxtLink to="/">Logo</NuxtLink></h1>
      <nav>
        <ul class="flex gap-10">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="#concept">Concept</NuxtLink></li>
        </ul>
      </nav>
    </div>

    <div class="app-link">
      <img src="" alt="" class="" />
      <button class="btn w-[100px]" @click="logIn">ログイン</button>
    </div>
  </header>
  <slot />
  <footer
    class="footer footer-center p-10 bg-primary text-white rounded min-h-[20vh]"
  >
    <nav>
      <p>Check my repo and profile with</p>
      <div class="flex items-center gap-4">
        <NuxtLink
          to="https://github.com/ry-113/library-management"
          class="cursor-pointer hover:opacity-80"
        >
          <Icon name="ant-design:github-filled" size="2rem" />
        </NuxtLink>
        <NuxtLink class="cursor-pointer hover:opacity-80">
          <Icon name="simple-icons:qiita" size="4rem" />
        </NuxtLink>
        <NuxtLink class="cursor-pointer hover:opacity-80">
          <Icon name="simple-icons:wantedly" size="2rem" />
        </NuxtLink>
      </div>
    </nav>
    <aside>
      <p>
        <NuxtLink
          href="https://jp.freepik.com/free-vector/isometric-online-library-illustration_7439543.htm#query=isometric%20book%20online%20blue&position=33&from_view=search&track=ais&uuid=9dc63efc-3f68-41c4-904c-9c6a3c37b10d#position=33&query=isometric%20book%20online%20blue"
          >ヒーロー画像著作者：macrovector</NuxtLink
        >／出典：Freepik
      </p>
      <p>Copyright © 2023 - All right reserved by Library-Management</p>
    </aside>
  </footer>
</template>