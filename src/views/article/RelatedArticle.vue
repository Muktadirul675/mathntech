<script setup>
import { ref, computed } from 'vue';
import { useArticleStore } from '@/stores/articleStore.js';
import HorizontalArticleCard from '@/components/article/HorizontalArticleCard.vue';

const props = defineProps({
    article: Object
})

let articleStore = useArticleStore()
let tagsArr = props.article.tags.split(',')

let relatedArticles = computed(() => {
    if (articleStore.articles.length) {
        let list = articleStore.articles.filter((obj) => {
            let objTagsArr = obj.tags.split(',')
            if (obj.id != props.article.id) {
                for (var i of objTagsArr) {
                    for (var j of tagsArr) {
                        if (i == j) return true;
                    }
                }
            }
            return false;
        })
        if(list.length < 4){
            var i = 0;
            while(list.length < 4){
                if(articleStore.articles[i].id != props.article.id){
                    list.push(articleStore.articles[i])
                }
                i++;
            }
        }
        return list;
    } else {
        return null;
    }
})
</script>
<template>
    <div class="container-fluid" v-if="relatedArticles != null">
        <div class="row" v-if="relatedArticles.length">
            <h5>More Articles</h5>
            <div class="col-12 col-lg-6 col-xl-6" v-for="article in relatedArticles">
                <HorizontalArticleCard :article="article" type="article"></HorizontalArticleCard>
            </div>
        </div>
    </div>
</template>
