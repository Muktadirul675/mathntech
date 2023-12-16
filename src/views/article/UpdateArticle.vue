<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore';
import Loading from '@/components/Loading.vue';
import { ClassicEditor as ArticleEditor } from '@/lib/ckeditor/articleConfig';
import { ClassicEditor as SimpleEditor } from '@/lib/ckeditor/simpleConfig';
import Form from '@/components/article/articleForm.vue'
 
const route = useRoute();

let id = route.params.id;
let articleStore = useArticleStore()
let article = computed(() => {
    if (articleStore.loading) { return null; }
    else { return articleStore.getArticle(id) }
})

let titleEditor = ref(null)
let title = computed(() => {
    let val = article.value.title;
    if(val){
        return val;
    }else{return null}
})
let bodyEditor = ref(null)
let body = computed(() => {
    let val = article.value.body;
    if(val){
        return val
    }
})
let imgLink = computed(() => article.value.coverImg)
let tagStr = computed(() => article.value.tags)
let subject = computed(() => article.value.subject)
let type = computed(() => article.value.type)
let status = computed(() => article.value.status)

</script>

<template>
    <div class="container p-3">
        <div class="row">
            <div class="col">
                <div v-if="article" class="article">
                    <Form :fields="article"></Form>
                </div>
                <Loading v-else></Loading>
            </div>
        </div>
    </div>
</template>
