<script setup>
import { ref, computed } from 'vue';
import { supabase } from '@/lib/supabase';
import { useBookmarkStore } from '@/stores/bookmarkStore.js'
import BookmarksItem from './BookmarksItem.vue';

let bookmarksStore = useBookmarkStore();
let bookmarks = computed(()=>{
    if(bookmarksStore.userBookmarks){return bookmarksStore.userBookmarks}
    else{return null}
})

</script>

<template>
    <div class="container-fluid bookmarks mt-3 rounded shadow p-3">
        <div class="row"> <br>
            <img class="bookmarkImg"
                src="https://res.cloudinary.com/dsfybjdih/image/upload/v1702632273/mathntech/book_slue10.png" alt="">
            Bookmarks
        </div>
        <div class="row">
            <div class="list">
                <div v-if="!bookmarks" class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div v-else>
                    <div v-if="bookmarks.length == 0">
                        No bookmarks
                    </div>
                    <div v-else  v-for="bm in bookmarks">
                        <BookmarksItem :article="bm"></BookmarksItem>
                    </div>
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
