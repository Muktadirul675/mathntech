<script setup>
import ArticleImage from './ArticleImage.vue';
import Tags from './Tags.vue';

let props = defineProps({
    article: Object,
    type:String
})
let article = props.article;

</script>

<template>
    <div class="articleCard p-3 shadow-sm">
        <ArticleImage :article="article" type="hArticle"></ArticleImage>
        <div style="position: relative;" class="p-1 mx-1">
            <h6>
                <RouterLink v-if="props.type == 'article'" :to="{name:'article',params:{id:article.id}}" v-html="article.title"></RouterLink>
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
