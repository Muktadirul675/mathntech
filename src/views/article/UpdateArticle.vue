<script setup>
import {  computed } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore.js';
import Loading from '@/components/Loading.vue';
import Form from '@/components/article/articleForm.vue'
 
const route = useRoute();

let id = route.params.id;
let articleStore = useArticleStore()
let article = computed(() => {
    if (articleStore.loading) { return null; }
    else { return articleStore.getArticle(id) }
})

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
