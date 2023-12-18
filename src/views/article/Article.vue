<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore';
import Loading from '@/components/Loading.vue';
import BookmarkSign from '@/components/article/BookmarkSign.vue';

const articleStore = useArticleStore()
const route = useRoute()
const id = route.params.id;
const article = computed(() => {
    if (articleStore.articles) { return articleStore.getArticle(id) }
    else { return null }
})

</script>

<template>
    <div v-if="article === null">
        <Loading></Loading>
    </div>
    <div v-else class="container">
        <div class="row justify-content-center">
            <div class="col-1 articleSideTools">
                <div>
                    <div class="tool">
                        <BookmarkSign :article="article"></BookmarkSign>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 col-xl-6 p-3 article">
                <img :src="article.coverImg" class="coverImg" alt=""> <br>
                <br>
                <h5 v-html="article.title"></h5>
                <span class="text-muted">{{ new Date(article.created_at).toDateString() }}</span> <br>
                <span style="font: smaller;border-radius: 30px;" class="px-2 py-1 bg-warning text-white">{{ article.subject
                }}</span>
                <br> <br>
                <div class="ck-content">
                    <div v-html="article.body"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.article {
    position: relative;
}

.coverImg {
    width: 100%;
    display: block;
}

.articleSideTools{
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
