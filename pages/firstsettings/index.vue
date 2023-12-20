<template>
  <div class="w-[50%] h-5 bg-[#4285f4] absolute rounded-r-full progress--bar"></div>
  <div class="absolute w-[40%] 2xl:w-[20%] bottom-0 right-0">
    <img src="/img/undraw_learning_sketching.png" alt="">
  </div>
  <div class="w-full max-w-md mx-auto py-[40vh]">
    <label for="displayName">
      <p class="text-xl">表示用のニックネームを入力してください</p>
      <p class="mb-8">※一度決めたニックネームは変更できません。</p>
      <input
        type="text"
        placeholder="ニックネームを入力"
        class="input input-bordered input-primary w-full max-w-md"
        id="displayName"
        v-model="displayName"
      />
    </label>
    <button class="btn btn-primary mt-10 block ml-auto p-0" @click="changeDisplayName">
        <NuxtLink class="block py-4 px-8" to="/firstsettings/welcome">次へ</NuxtLink>
    </button>
  </div>
</template>
<script setup lang="ts">

definePageMeta({
  middleware: ['auth'],
  layout: false,
});
//フロント側で状態を保持したいときはuseState
const displayName = useState("displayName", () => "");

//authやfirestoreを使うときはcomposable
const changeDisplayName = () => {
    const {changeName} = useUserSetting();
    changeName(displayName.value);
}
</script>

<style scoped>
.progress--bar {
  view-transition-name: progress-bar;
}
</style>