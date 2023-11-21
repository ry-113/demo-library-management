<template>
  <div class="w-full max-w-md mx-auto py-[40vh]">
    <label for="displayName">
      表示用のニックネームを入力してください
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-primary w-full max-w-md"
        id="displayName"
        v-model="displayName"
      />
    </label>
    <button class="btn mt-10 block ml-auto p-0" @click="changeDisplayName">
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
