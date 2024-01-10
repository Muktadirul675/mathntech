<script setup>
import { computed } from 'vue';
import { useBookmarkStore } from '@/stores/bookmarkStore.js';
import { useAuthStore } from '@/stores/authStore.js';
import { useArticleStore } from '@/stores/articleStore.js';
import HorizontalArticleCard from '../article/HorizontalArticleCard.vue';
import { useRouter } from 'vue-router';

let router = useRouter()
let authStore = useAuthStore()
let articleStore = useArticleStore()
let bookmarkStore = useBookmarkStore();
let isLoading = computed(()=>bookmarkStore.isLoading)
let bookmarks = computed(()=>{
    if(isLoading.value){return null}
    else{
        let list = bookmarkStore.bookmarks
        return list
    }
})

</script>

<template>
    <div>
        <div class="p-1 my-2" v-if="bookmarks">
            <div v-for="bookmark in bookmarks">
                <a style="display:inline-block" data-bs-dismiss="offcanvas"
                        aria-label="Close" @click="router.push({name:'article',params:{id:bookmark.article.id}})">
                        <template v-if="!(bookmark.deleted)">
                            <HorizontalArticleCard  type="article" :article="bookmark.article"></HorizontalArticleCard>
                        </template>
                </a>
            </div>
        </div>
        <div v-else class="p-1">
            No bookmarks right now. Click on '<i class="fi fi-br-bookmark text-warning"></i>' this button to add bookmarks.
        </div>
    </div>
</template>

<style scoped>
</style>
