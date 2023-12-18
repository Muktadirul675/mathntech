<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import UserInfo from '@/components/userInfo/UserInfo.vue'
import '@/assets/main.css';
import { ref, onBeforeMount } from 'vue';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from "@/stores/authStore"

let authStore = useAuthStore()

onBeforeMount(async () => {
    authStore.checkUser()
})
</script>

<template>
  <Nav></Nav>
  <UserInfo></UserInfo>
  <RouterView />
</template>

<style setup>

</style>
