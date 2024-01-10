<script setup>
import { ref, computed } from 'vue';
import { usePostStore } from '@/stores/postStore.js';
import HorizontalArticleCard  from '@/components/article/HorizontalArticleCard.vue';
import PostCard from '@/components/article/PostCard.vue';

const props = defineProps({
    article: Object
})

let articleStore = usePostStore()
let tagsArr = props.article.tags.split(',')

let relatedArticles = computed(() => {
    if (articleStore.articles.length) {
        let list = articleStore.articles.filter((obj) => {
            if(obj.id != props.article.id){
                let objTagsArr = obj.tags.split(',')
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
    <div class="container-fluid"  v-if="relatedArticles">
        <div class="row">
            <h5>More Posts</h5>
            <div class="col-12 col-lg-6 col-xl-6" v-for="article in relatedArticles">
                <PostCard :article="article"></PostCard>
            </div>
        </div>
    </div>
</template>