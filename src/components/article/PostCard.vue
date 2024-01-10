<script setup>
import Tags from './Tags.vue';

let props = defineProps({
    article: Object,
})
let article = props.article;

</script>

<template>
    <div class="articleCard p-3 shadow-sm">
        <div style="position: relative;" class="p-1 mx-1">
            <h6>
                <RouterLink :to="{name:'post',params:{id:article.id}}" v-html="article.title"></RouterLink>
            </h6>
            <small class="bg-warning px-2 py-1 text-white" style="border-radius: 30px;">{{ article.subject }}</small>
            <div class="my-1"></div>
            <Tags :article="article"></Tags>
        </div>
    </div>
</template>

<style scoped>
    .articleCard{
        display: flex;
    }
</style>