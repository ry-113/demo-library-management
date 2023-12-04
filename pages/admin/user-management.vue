<template>
    <p>管理者のユーザー管理ページ</p>
    <ul>
        <li v-for="user in allUsers" :key="user.uid">
            {{ user.role }}-{{ user.name }}
        </li>
    </ul>
</template>

<script setup langg="ts">
const {allUsers, isLoading, getAllUsers} = useUserStore();
</script>