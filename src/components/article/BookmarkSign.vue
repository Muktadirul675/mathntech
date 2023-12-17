<script setup>
import { ref, computed } from 'vue';
import { useBookmarkStore } from '@/stores/bookmarkStore';

const props = defineProps({
    article: Object
})

const bookmarkStore = useBookmarkStore()

let bookmark = ref(null)
let isLoading = ref(false)
let isBookmarked = computed(() => {
    if (bookmarkStore.userBookmarks) {
        for (var i of bookmarkStore.userBookmarks) {
            if (i.articles.id == props.article.id) { bookmark.value = i; return true; }
        }
        return false
    } else { return null }
})

 function del() {
    isLoading.value = true
    bookmarkStore.deleteBookmark(bookmark.value.id).then(isLoading.value = false)
}

 function add() {
    isLoading.value = true
    bookmarkStore.addBookmark(props.article.id).then(isLoading.value = false)
}

</script>

<template>
    <div style="cursor: pointer;">
        <div v-if="isBookmarked === null">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <div v-if="isBookmarked">
                <div @click="del">
                    <i class="fi fi-sr-bookmark text-warning"></i>
                </div>
            </div>
            <div v-else>
                <div @click="add">
                    <i class="fi fi-br-bookmark text-warning"></i>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div v-if="isLoading" class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
