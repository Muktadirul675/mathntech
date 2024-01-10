<script setup>
const props = defineProps({
    article: Object,
    type: String
})

let imgUrl = props.article.coverImg;
let type = props.type;

</script>

<template>
    <div v-if="type=='vArticle'" class="vArticleImg">
        <img :src="imgUrl" alt="">
    </div>
    <div v-else class="hArticleImg">
        <img :src="imgUrl" alt="">
    </div>
</template>

<style scoped>
.vArticleImg img{
    width: 100%;
    height: calc(100% * (9/16));
}
.hArticleImg img{
    width: 100%;
    /* height: 72px; */
    border-radius: 8px;
}
</style>
