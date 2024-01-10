<script setup>
import { useFeedStore } from '@/stores/feedStore.js';
import VerticalArticleCard from '../article/VerticalArticleCard.vue';
import { RouterLink } from 'vue-router';

const feedStore = useFeedStore()

</script>

<template>
    <h5>Serieses - <RouterLink :to="{ name: 'seriesBlog' }">See all</RouterLink>
    </h5>
    <template v-for="series in feedStore.serieses">
        <VerticalArticleCard type="series" :article="series"></VerticalArticleCard>
    </template>
</template>
