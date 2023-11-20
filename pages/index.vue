<template>
    <div>
        <h1>蔵書管理アプリへようこそ</h1>
        <p>G-mailアカウントで登録することができます</p>
        <div v-if="auth.currentUser == null">
            <button class="btn my-10" type="button" role="button"
                @click="auth.signIn">
                はじめる
            </button>
        </div>
        <div v-else>
            <button class="btn " type="button" role="button"
                @click="auth.signOutUser">
                Sign Out
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "custom",
});
const googleSignUp = () => {
    const {googleSignUp} = useAuth()
    googleSignUp();
};
</script>