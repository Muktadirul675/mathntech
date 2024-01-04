<script setup>
import { computed, ref } from 'vue';
import VerticalArticleCard from '../article/VerticalArticleCard.vue';
import { supabase } from '@/lib/supabase.js';
import { useArticleStore } from '@/stores/articleStore.js';
import { ContentLoader } from 'vue-content-loader';

const articleStore = useArticleStore()
let article = computed(()=>articleStore.featured)

</script>

<template>
    <template v-if="article != null">
        <VerticalArticleCard type="article" :article="article"></VerticalArticleCard>
    </template>
    <template v-else>
        <content-loader viewBox="0 0 800 450" :speed="2" primaryColor="#f3f3f3" secondaryColor="#ecebeb">
            <rect x="6" y="15" rx="3" ry="3" width="88" height="6" />
            <rect x="48" y="33" rx="3" ry="3" width="52" height="0" />
            <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
            <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
            <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
            <rect x="4" y="34" rx="3" ry="3" width="88" height="6" />
        </content-loader>
    </template>
</template>
