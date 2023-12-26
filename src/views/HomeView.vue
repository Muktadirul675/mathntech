<script setup>
import { onMounted,ref } from 'vue';

const content = ref("<h1>Hi</h1>")

</script>

<template>
  <main></main>
  <button>Set</button>
  <div v-html="content"></div>
</template>

<style scoped>

</style>
