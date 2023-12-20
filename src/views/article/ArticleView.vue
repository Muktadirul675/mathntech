<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
    <h1>Article</h1>
    <RouterView  :key="$route.path" />
</template>
