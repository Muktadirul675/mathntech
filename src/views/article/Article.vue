<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/authStore.js';
import { useArticleStore } from '@/stores/articleStore.js';
import ArticleCommentList from '@/components/article/articleCommentList.vue';
import Loading from '@/components/Loading.vue';
import BookmarkSign from '@/components/article/BookmarkSign.vue';
import Tags from '@/components/article/Tags.vue';

const articleStore = useArticleStore()
const authStore = useAuthStore()
const route = useRoute()
const id = route.params.id;
const article = computed(() => {
    if (articleStore.articles) { return articleStore.getArticle(id) }
    else { return null }
})

async function copyUrl(){
    navigator.clipboard.writeText(window.location.href)
}

</script>

<template>
    <div v-if="!article">
        <Loading></Loading>
    </div>
    <div v-else class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-6 col-xl-6 p-3 article">
                <img v-if="article.type != 'post'" :src="article.coverImg" class="coverImg" alt=""> <br>
                <br>
                <h5 v-html="article.title"></h5>
                <span class="text-muted">{{ new Date(article.created_at).toDateString() }}</span> <br>
                <span style="font: smaller;border-radius: 30px;" class="px-2 py-1 bg-warning text-white">{{ article.subject
                }}</span>
                <br> <br>
                <div class="ck-content">
                    <div v-html="article.body"></div>
                </div>
                <div v-if="article != null">
                    <Tags :article="article"></Tags> <br>
                </div>
            </div>
            <div class="col-1">
                <div class="articleSideTools">
                    <div class="toolList">
                        <div v-if="article.type != 'post'" class="tool">
                            <BookmarkSign :article="article"></BookmarkSign>
                        </div>
                        <div v-if="authStore.isAdmin" class="tool ">
                            <RouterLink :to="{ name: 'updateArticle', params: { id: article.id } }">
                                <i class="fi fi-sr-blog-pencil text-warning"></i>
                            </RouterLink>
                        </div>
                        <div id="commentTool" class="tool text-warning">
                            <i class="fi fi-rr-comments"></i>
                        </div>
                        <div @click="copyUrl" class="tool text-warning">
                            <i class="fi fi-rr-share"></i>
                        </div>
                        <!-- <div class="tool text-danger">
                            <i class="fi fi-rr-exclamation"></i>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center p-0">
            <div class="col-12 col-lg-7 col-xl-7">
                <ArticleCommentList :article="article"></ArticleCommentList>
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

.articleSideTools {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
    height: 100vh;
    position: sticky;
    top: 0;
}

.tool {
    margin-bottom: 10px;
    cursor: pointer;
}

@media (max-width:998px) {
    .articleSideTools {
        display: inherit;
        position: inherit;
        padding: 10px;
        height: fit-content;
    }

    .toolList {
        display: flex;
        justify-content: center;
    }

    .tool {
        margin: 5px;
        padding: 0 10px 0 10px
    }
}
</style>
