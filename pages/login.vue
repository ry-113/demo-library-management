<template>
    <div>
        <h1>蔵書管理アプリへようこそ</h1>
        <p>G-mailアカウントで登録することができます</p>
        <div>
            <button class="btn my-10" type="button" role="button"
                @click="logIn">
                はじめる
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "custom",
});
const logIn = () => {
    const {logIn} = useAuth()
    logIn();
};
</script>