<script setup>
import { useFeedStore } from '@/stores/feedStore.js'
import HorizontalArticleCard from '../article/HorizontalArticleCard.vue';
import {RouterLink} from 'vue-router';
const feedStore = useFeedStore()
</script>

<template>
    <h5>Articles - <RouterLink :to="{name:'blog'}">See all</RouterLink></h5>
<template v-for="article in feedStore.articles">
    <HorizontalArticleCard type="article" :article="article"></HorizontalArticleCard>
</template>
</template>
