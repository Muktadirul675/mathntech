<script setup>
import { ref, computed } from 'vue';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import ArticleComment from './articleComment.vue';
import { Warning } from 'postcss';

const props = defineProps({
    article: Object
})
const authStore = useAuthStore()
const comments = ref(null)
const isLoading = ref(true)

async function getComments() {
    // let { data: commentsData, error } = 
    console.log(props.article.id)
    await supabase
        .from('comments')
        .select('*')
        .eq('article', props.article.id)
        .then((res) => { console.log(res); comments.value = res.data })
}

getComments()

</script>

<template>
    <div>
        Comments
        <span v-if="comments">({{ comments.length }})</span>
        <div v-else class="spinner-border spinner-border-sm text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="commentsList">
            <ArticleComment v-for="comment in comments" :comment="comment"></ArticleComment>
            <div class="form my-2">
                <form class="form-group addComment">
                    <textarea type="text" class="form-control" placeholder="Your thoughts..." name="" id=""> </textarea>
                    <div>
                        <button class="btn btn-warning text-white mx-1">
                            <i class="fi fi-rr-paper-plane-top"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.addComment {
    width: 500px;
    display: flex;
}

@media (max-width:998px) {
    .addComment {
        width: fit-content;
    }
}
</style>
