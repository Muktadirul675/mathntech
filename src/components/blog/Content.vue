<script setup>
import VerticalArticleCard from '../article/VerticalArticleCard.vue';
import PostCard from '../article/PostCard.vue';

let props = defineProps({
    article: Object,
    type: String
})
let article = props.article;

</script>

<template>
    <div >
        <div v-if="type == 'post'">
            <PostCard :article="article"></PostCard>
        </div>
        <div v-else>
            <VerticalArticleCard :type="type" :article="article"></VerticalArticleCard>
        </div>
    </div>
</template>