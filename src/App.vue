<script setup>
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import UserInfo from '@/components/userInfo/UserInfo.vue'
import '@/assets/main.css';
import { onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/authStore.js'

let authStore = useAuthStore()

onBeforeMount(async () => {
  authStore.checkUser()
})

</script>

<template>
  <Nav></Nav>
  <UserInfo></UserInfo>
  <RouterView  :key="$route.path" />
</template>

<style setup></style>
