<script setup>
import { useFeedStore } from '@/stores/feedStore.js';
import { RouterLink } from 'vue-router'
import PostCard from '../article/PostCard.vue';

const feedStore = useFeedStore()

</script>

<template>
    <h5>Posts - <RouterLink :to="{ name: 'postBlog' }">See all</RouterLink>
    </h5>
    <template v-for="post in feedStore.posts">
        <PostCard :article="post"></PostCard>
    </template>
</template>
