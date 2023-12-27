<script setup>
import { useSeriesStore } from '@/stores/seriesStore.js';
import { ref, computed } from 'vue';
import Loading from '@/components/Loading.vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore.js';
import HorizontalArticleCard from '@/components/article/HorizontalArticleCard.vue';
import Tags from '@/components/article/Tags.vue';

const route = useRoute()
const id = route.params.id
const seriesStore = useSeriesStore()
const articleStore = useArticleStore()
const series = computed(() => {
    if (seriesStore.series) { return seriesStore.getSeriesWithId(id) }
    else {
        return null;
    }
})

</script>

<template>
    <Loading v-if="!series"></Loading>
    <div v-else>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-5 col-xl-5 p-3">
                    <img :src="series.coverImg" class="coverImg" alt=""> <br> <br>
                    <h4 v-html="series.title"></h4>
                    <span style="font-size: small;">{{ new Date(series.created_at).toDateString() }}</span> <br>
                    <span class="px-1 px-2 bg-warning text-white" style="border-radius: 30px;">{{ series.subject }}</span>
                    <br> <br>
                    <div class="body" v-html="series.body"></div>
                    <Tags :article="series"></Tags>
                </div>
                <div class="col-12 col-lg-5 col-xl-5 p-3">
                    <div v-if="!articleStore.articles" class="spinner-border spinner-border-sm text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <template v-else>
                        <div class="my-1" v-for="articleId in series.articles">
                            <template v-if="articleStore.getArticle(articleId)">
                                <HorizontalArticleCard type="article" :article="articleStore.getArticle(articleId)"></HorizontalArticleCard>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.coverImg {
    width: 100%;
}
</style>
