<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';
import { useBookmarkStore } from '@/stores/bookmarkStore';

const props = defineProps({
    article: Object
})

let article = props.article
let bookmarkStore = useBookmarkStore()
let deleting = ref(false)
let deleted = ref(false)
let router = useRouter()

async function del() {
    deleting.value = true
    await bookmarkStore.deleteBookmark(article.id)
}

</script>

<template>
    <div class="bookmarkItem container-fluid">
        <div class="row">
            <div class="col-10">
                <span class="my-1">
                    <a type="button" aria-label="close"
                        @click="router.push({ name: 'article', params: { id: article.articles.id } })" class="mx-1"
                        data-bs-dismiss="offcanvas">{{ article.articles.title }}</a>
                </span> <br>
                <span class="px-2 py-1 bg-warning text-white" style="border-radius: 30px;font-size: smaller;">{{
                    article.articles.subject }}</span>
            </div>
        </div>
        <hr>
    </div>
</template>
