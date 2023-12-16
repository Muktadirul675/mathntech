<script setup>
import { ref, computed } from '@vue/reactivity';
import { useArticleStore } from '@/stores/articleStore';
import Loading from '@/components/Loading.vue';
import Content from '@/components/blog/Content.vue'

const articleStore = useArticleStore()
const searchTxt = ref('')

const articles = computed(() => {
    if (searchTxt.value == '') { return articleStore.publicArticles }
    else {
        return articleStore.publicArticles.filter(
            ({ title, type, tags }) => [title, type, tags]
                .some(val => val.toLowerCase().includes(searchTxt.value.toLowerCase()))
        )
    }
})

</script>

<template>
    <Loading v-if="articleStore.loading"></Loading>
    <div v-else>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-8 p-3">
                    <form class="form-group">
                        <input type="text" name="" v-model="searchTxt" id="" class="form-control">
                    </form>
                </div>
            </div>
            <div class="row">
                <div v-for="article in articles" class="col-12 col-lg-3 col-xl-3">
                    <Content :article="article"></Content>
                </div>
            </div>
        </div>
    </div>
</template>