<script setup>
import {useFeedStore} from '@/stores/feedStore.js';
import VerticalArticleCard from '../article/VerticalArticleCard.vue';
import { RouterLink } from 'vue-router';

const feedStore = useFeedStore()

</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <h5>Serieses - <RouterLink :to="{name:'seriesBlog'}">See all</RouterLink> </h5>
            <div class="col-12" v-for="series in feedStore.serieses">
                <VerticalArticleCard type="series" :article="series"></VerticalArticleCard>
            </div>
        </div>
    </div>
</template>
