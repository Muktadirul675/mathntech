<script setup>
import ArticleImage from './ArticleImage.vue';
import Tags from './Tags.vue';

let props = defineProps({
    article: Object
})
let article = props.article;

function truncate(value, length) {
    if (value.length > length) {
        return value.substring(0, length) + "...";
    } else {
        return value;
    }
}

</script>

<template>
    <div class="articleCard p-3 shadow-sm my-1">
        <div class="image">
            <ArticleImage :article="article" type="vArticle"></ArticleImage>
        </div>
        <div class="heading">
            <h6>{{ article.title }}</h6>
            <div style="font-size: small;" class="text-muted my-1">
                {{ truncate(article.body,100) }}
            </div>
            <span class="subject bg-warning text-white px-2 py-1" style="border-radius: 30px; font-size: smaller;">{{
                article.subject }}</span>
            <Tags :article="article"></Tags>
        </div>
    </div>
</template>

<style scoped>
.articleCard:hover{
    transform: translate(1.5);
}
</style>
