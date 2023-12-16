<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import UserInfo from '@/components/userInfo/UserInfo.vue'
</script>

<template>
  <header>
      <Nav></Nav>
    <UserInfo></UserInfo>
  </header>
  <div class="container">
    <div class="row">
      <div class="col">
        <RouterView />
      </div>
    </div>
  </div>
</template>
