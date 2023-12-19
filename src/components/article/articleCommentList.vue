<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import ArticleComment from './articleComment.vue';
import { toast } from 'vue3-toastify';

const props = defineProps({
    article: Object
})
const authStore = useAuthStore()
const comments = ref(null)
const isLoading = ref(true)
const wriittenComment = ref('')
const isAdding = ref(false)

onMounted(() => {
    document.getElementById("commentTool").addEventListener('click',()=>{
        document.getElementById("commentBox").focus()
    })
})

async function getComments() {
    // let { data: commentsData, error } = 
    console.log(props.article.id)
    await supabase
        .from('comments')
        .select('*')
        .eq('article', props.article.id)
        .then((res) => {
            comments.value = res.data
        })
}

getComments()

function canAdd(cmnt) {
    var allow = false
    var allowedStr = ''
    for (var i = 0; i < cmnt.length; i++) {
        if (!(cmnt[i] == ' ')) {
            allow = true
            allowedStr = cmnt.substr(i)
        }
    }
    return { allow, allowedStr }
}

async function addComment(event) {
    event.preventDefault()
    if (authStore.loggedUser) {
        let c = wriittenComment.value
        let { allow, allowedStr } = canAdd(c)
        if (allow) {
            isAdding.value = true
            await supabase.from('comments').insert({
                comment: wriittenComment.value,
                email: authStore.loggedUser.email,
                name: authStore.loggedUser.full_name,
                article: props.article.id
            }).then((res) => { isAdding.value = false; wriittenComment.value = '' })
        } else {
            wriittenComment.value = ''
            toast.error("Comment can't be empty", { position: toast.POSITION.TOP_RIGHT })
        }
    } else {
        toast.error('Login to comment', { position: toast.POSITION.TOP_RIGHT })
    }
}


const channels = supabase.channel('custom-all-channel')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comments' },
        (payload) => {
            if (payload.eventType == 'INSERT') {
                comments.value.push(payload.new)
            }
            if (payload.eventType == 'UPDATE') {
                let newComments = comments.value
                for (var i = 0; i < newComments.length; i++) {
                    if (newComments[i].id == payload.new.id) {
                        newComments[i] = payload.new
                        break
                    }
                }
                comments.value = newComments
            }
        }
    )
    .subscribe()

</script>

<template>
    <div>
        <h5 v-if="comments">
            Comments
            <span>({{ comments.length }})</span>
        </h5>
        <div v-else class="spinner-border spinner-border-sm text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="commentsList">
            <ArticleComment v-for="comment in comments" :comment="comment"></ArticleComment> 
            <div class="form my-2">
                <form class="form-group addComment" @submit="addComment">
                    <textarea v-model="wriittenComment" id="commentBox" type="text" class="form-control"
                        placeholder="Your thoughts..." name=""> </textarea>
                    <div>
                        <div v-if="isAdding" class="spinner-border spinner-border-sm text-warning" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <button v-else type="submit" class="btn btn-warning text-white mx-1">
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
