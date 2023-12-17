<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { useBookmarkStore } from '@/stores/bookmarkStore';

const props = defineProps({
    article: Object
})

let article = props.article
let bookmarkStore = useBookmarkStore()
let deleting = ref(false)
let deleted = ref(false)

function del() {
    deleting.value = true
    bookmarkStore.deleteBookmark(article.id).then(deleted.value=true)
}

</script>

<template>
    <div v-show="!deleted" class="bookmarkItem container-fluid">
        <div class="row">
            <div class="col-10">
                <span>
                    {{ article.articles.title  }}
                </span> <br>
                <span class="px-2 py-1 bg-warning text-white" style="border-radius: 30px;font-size: smaller;">{{
                    article.articles.subject }}</span>
            </div>
            <div class="col-2">
                <span @click="del" class="text-danger" style="cursor: pointer;">
                    <i class="fi fi-rr-trash"></i>
                </span>
            </div>
        </div>
        <hr>
    </div>
</template>
