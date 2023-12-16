<script setup>
import VerticalArticleCard from '../article/VerticalArticleCard.vue';

let props = defineProps({
    article: Object
})
let article = props.article;

</script>

<template>
    <div >
        <VerticalArticleCard :article="article"></VerticalArticleCard>
    </div>
</template>