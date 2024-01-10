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
    <!-- col-12 col-lg-3 col-xl-3 -->
    <div class="articleCard p-0 shadow-sm my-1">
        <div class="image">
            <ArticleImage :article="article" type="vArticle"></ArticleImage>
        </div> 
        <div class="heading px-2 py-2">
            <h6> 
                <RouterLink v-if="props.type == 'article'" :to="{name:'article',params:{id:article.id}}" v-html="article.title">
                </RouterLink>
                <RouterLink v-if="props.type == 'series'" :to="{name:'series',params:{id:article.id}}" v-html="article.title">
                </RouterLink>
            </h6>
            <small class="subject bg-warning text-white px-2 py-1" style="border-radius: 30px; ">{{
                article.subject }}</small>
            <div class="row p-2">
                <div class="col-10">
                    <Tags :article="article"></Tags>
                </div>
                <div v-if="props.type == 'article'" class="col-2" style="display: flex;justify-content: end;">
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
