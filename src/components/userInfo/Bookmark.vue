<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';

let bookmarks = ref([])

</script>

<template>
    <div class="container-fluid bookmarks mt-2 rounded shadow p-3">
        <div class="row">
            <img class="bookmarkImg"
                src="https://res.cloudinary.com/dsfybjdih/image/upload/v1702632273/mathntech/book_slue10.png" alt="">
            Bookmarks
            <div v-if="bookmarks.length>0">

            </div>
            <div v-else>
                <p>No bookmarks</p>
            </div>
        </div>
    </div>
</template>

<style>
.bookmarks .bookmarkImg {
    width: 50px;
    height: 30px;
    margin-right: 5px;
}
</style>
