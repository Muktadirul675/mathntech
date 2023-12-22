<script setup>
import ArticleImage from './ArticleImage.vue';
import Tags from './Tags.vue';
import BookmarkSign from './BookmarkSign.vue';
import { RouterLink } from 'vue-router';

let props = defineProps({
    article: Object,
    type: String
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
        </div> <br>
        <div class="heading">
            <h6> 
                <RouterLink v-if="props.type == 'article'" :to="{name:'article',params:{id:article.id}}" v-html="article.title">
                </RouterLink>
                <RouterLink v-if="props.type == 'series'" :to="{name:'series',params:{id:article.id}}" v-html="article.title">
                </RouterLink>
            </h6>
            <span class="subject bg-warning text-white px-2 py-1" style="border-radius: 30px; font-size: smaller;">{{
                article.subject }}</span>
            <div class="row">
                <div class="col-11">
                    <Tags :article="article"></Tags>
                </div>
                <div class="col-1 p-1">
                    <BookmarkSign :article="article"></BookmarkSign>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.articleCard:hover {
    transform: translate(1.5);
}
</style>
