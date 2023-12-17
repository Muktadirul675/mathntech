<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { useBookmarkStore } from '@/stores/bookmarkStore.js'
import BookmarksItem from './BookmarksItem.vue';

let bookmarks = ref(null)
let bookmarksStore = useBookmarkStore();

</script>

<template>
    <div class="container-fluid bookmarks mt-2 rounded shadow p-3">
        <div class="row">
            <img class="bookmarkImg"
                src="https://res.cloudinary.com/dsfybjdih/image/upload/v1702632273/mathntech/book_slue10.png" alt="">
            Bookmarks
            <div class="list">
                <div v-if="!bookmarksStore.userBookmarks" class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div v-else>
                    <BookmarksItem v-for="bm in bookmarksStore.userBookmarks" :article="bm"></BookmarksItem>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bookmarks .bookmarkImg {
    width: 50px;
    height: 30px;
    margin-right: 5px;
}

.list ol{padding:0;}
.list ol li{
    list-style: none;
}

</style>
