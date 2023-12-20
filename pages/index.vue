<template>
  <div class="w-0 h-5 bg-[#4285f4] absolute top-0 progress--bar"></div>
  <div class="hero min-h-[70vh] bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-lg">
        <h1 class="text-5xl font-bold mb-10">Library Management</h1>
        <div>
          <h1>蔵書管理アプリへようこそ</h1>
          <p>G-mailアカウントで登録することができます</p>
          <div>
            <button class="btn my-10" type="button" role="button" @click="logIn">はじめる</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom',
});
const logIn = () => {
  const { logIn } = useAuth();
  logIn();
};
</script>

<style scoped>
.progress--bar {
  view-transition-name: progress-bar;
}
</style>