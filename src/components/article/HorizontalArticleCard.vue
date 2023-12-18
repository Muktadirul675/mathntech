<script setup>
import ArticleImage from './ArticleImage.vue';
import Tags from './Tags.vue';

let props = defineProps({
    article: Object
})
let article = props.article;

</script>

<template>
    <div class="articleCard p-3 shadow-sm">
        <ArticleImage :article="article" type="hArticle"></ArticleImage>
        <div class="p-1 mx-1">
            <h6>
                <RouterLink :to="{name:'article',params:{id:article.id}}">{{ article.title }}</RouterLink> 
            </h6>
            <Tags :article="article"></Tags>
        </div>
    </div>
</template>

<style scoped>
    .articleCard{
        display: flex;
    }
</style>
