<script setup>
import { ref, computed } from 'vue';
import { useBookmarkStore } from '@/stores/bookmarkStore.js';
import { useAuthStore } from '@/stores/authStore.js';
import { toast } from 'vue3-toastify';

const props = defineProps({
    article: Object
})

const proceesIndicator = ref(false)
const bookmarkStore = useBookmarkStore()
let authStore = useAuthStore()
let bookmarks = computed(() => {
    if (authStore.logged) {
        if (bookmarkStore.isLoading) { return null }
        else {
            let list = bookmarkStore.bookmarks
            return list
        }
    } else { return null }
})

let bookmark = ref(null)
let isBookmarked = computed(() => {
    if (authStore.logged) {
        if (!(bookmarks.value)) {
            return null;
        } else {
            for (var i of bookmarks.value) {
                if (i.article.id == props.article.id && i.deleted == false) { bookmark.value = i; return true }
            }
            return false;
        }
    } else { return null; }
})

async function add() {
    if (authStore.logged) {
        proceesIndicator.value = true
        await bookmarkStore.add(props.article).then((res) => { toast.success('Bookmarked'); proceesIndicator.value = false }).catch((error) => { console.log(error); proceesIndicator.value = false })
    } else {
        toast.error("Please login to add bookmark", { position: toast.POSITION.TOP_RIGHT })
    }
}

async function del() {
    if (authStore.logged) {
        proceesIndicator.value = true
        await bookmarkStore.del(bookmark.value).then((res) => { proceesIndicator.value = false }).catch((error) => { console.log(error); })
    } else { toast.error("Please login to add bookmark", { position: toast.POSITION.TOP_RIGHT }) }
}

</script>

<template>
    <div>
        <div v-if="authStore.logged">
            <div v-if="isBookmarked === null">
                <div class="spinner-border spinner-border-sm text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-else>
                <div v-if="isBookmarked" @click="del">
                    <i style="cursor: pointer;" class="fi fi-sr-bookmark text-warning"></i>
                </div>
                <div v-else @click="add">
                    <i style="cursor: pointer;" class="fi fi-br-bookmark text-warning"></i>
                </div>
            </div>
            <div v-if="proceesIndicator">
                <div class="spinner-border spinner-border-sm text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else>
            <div @click="add">
                <i style="cursor: pointer;" class="fi fi-br-bookmark text-warning"></i>
            </div>
        </div>
    </div>
</template>

    <!-- <div class="spinner-border spinner-border-sm text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    <div @click="del">
        <i class="fi fi-sr-bookmark text-warning"></i>
    </div>
    <div @click="add">
        <i class="fi fi-br-bookmark text-warning"></i>
    </div> -->
