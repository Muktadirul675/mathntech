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
            <h5>
                <RouterLink :to="{name:'post',params:{id:article.id}}" v-html="article.title"></RouterLink>
            </h5>
            <span class="bg-warning px-2 py-1 text-white my-2" style="border-radius: 30px;">{{ article.subject }}</span>
            <Tags :article="article"></Tags>
        </div>
    </div>
</template>

<style scoped>
    .articleCard{
        display: flex;
    }
</style>