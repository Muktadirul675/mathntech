<script setup>
import VerticalArticleCard from '../article/VerticalArticleCard.vue';

let props = defineProps({
    article: Object,
    type: String
})
let article = props.article;

</script>

<template>
    <div >
        <VerticalArticleCard :type="type" :article="article"></VerticalArticleCard>
    </div>
</template>