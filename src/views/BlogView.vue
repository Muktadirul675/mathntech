<script setup>
import { ref, computed, watch, reactive } from 'vue';
import { useArticleStore } from '@/stores/articleStore.js';
import Loading from '@/components/Loading.vue';
import Content from '@/components/blog/Content.vue'

const articleStore = useArticleStore()
const searchTxt = ref('')
const articles = reactive(articleStore.articles)

watch(searchTxt, (newVal, oldVal) => {
    if (searchTxt.value == '') {
        for (var i in articles) {
            articles[i].show = true
        }
    } else {
        for (var i in articles) {
            if(articles[i].title.toLowerCase().includes(searchTxt.value.toLowerCase())){articles[i].show = true}
            else{articles[i].show = false}
        }
    }
})

function onSubmit(event) {
    event.preventDefault()
}

</script>

<template>
    <Loading v-if="articleStore.loading"></Loading>
    <div v-else>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-8 p-3">
                    <form @submit="onSubmit" class="form-group">
                        <div class="input-group mb-3">
                            <button class="btn btn-warning dropdown-toggle1" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false"><i class="fi fi-rr-settings-sliders"></i></button>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink :to="{ name: 'blog' }" class="dropdown-item">
                                        Articles
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink :to="{ name: 'seriesBlog' }" class="dropdown-item">
                                        Series
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink :to="{ name: 'postBlog' }" class="dropdown-item">
                                        Posts
                                    </RouterLink>
                                </li>
                            </ul>
                            <input type="text" class="form-control" v-model="searchTxt">
                            <button class="btn btn-warning text-white">
                                <i class="fi fi-rr-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <template v-for="article in articles">
                    <div v-if="article.show" class="col-12 col-lg-3 col-xl-3">
                        <Content type="article" :article="article"></Content>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>