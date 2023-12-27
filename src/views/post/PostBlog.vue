<script setup>
import { ref, computed, watch, reactive } from 'vue';
import { usePostStore } from '@/stores/postStore.js'
import Loading from '@/components/Loading.vue';
import Content from '@/components/blog/Content.vue'

const postStore = usePostStore()
const searchTxt = ref('')
const posts = reactive(postStore.articles)

watch(searchTxt, (newVal, oldVal) => {
    if (searchTxt.value == '') {
        for (var i in posts) {
            posts[i].show = true
        }
    } else {
        for (var i in posts) {
            if (posts[i].title.toLowerCase().includes(searchTxt.value.toLowerCase())) { posts[i].show = true }
            else { posts[i].show = false }
        }
    }
})

function onSubmit(event) {
    event.preventDefault()
}

</script>

<template>
    <Loading v-if="postStore.loading"></Loading>
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
                <template v-for="post in posts">
                    <div v-if="post.show" class="col-12 col-lg-3 col-xl-3">
                        <Content type="post" :article="post"></Content>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>