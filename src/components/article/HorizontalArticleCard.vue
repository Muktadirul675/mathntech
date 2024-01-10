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
    <div class="container-fluid p-3 shadow-sm">
        <div class="row">
            <div class="col-8 p-1">
                <h6>
                    <RouterLink v-if="props.type == 'article'" :to="{name:'article',params:{id:article.id}}" v-html="article.title"></RouterLink>
                </h6>
            </div>
            <div class="col-4 p-1">
                <ArticleImage :article="article" type="hArticle"></ArticleImage>
            </div>
        </div>
        <div class="row">
            <div class="col-11">
                <Tags :article="article"></Tags>
            </div>
        </div>
    </div>
</template>

<style scoped>
   
</style>
