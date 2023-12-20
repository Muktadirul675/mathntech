<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import ArticleComment from './articleComment.vue';
import { toast } from 'vue3-toastify';

const props = defineProps({
    article: Object
})
const authStore = useAuthStore()
const comments = reactive([])
const isLoading = ref(true)
const wriittenComment = ref('')
const isAdding = ref(false)

onMounted(() => {
    document.getElementById("commentTool").addEventListener('click', () => {
        document.getElementById("commentBox").focus()
    })
})

async function getComments() {
    // let { data: commentsData, error } = 
    // console.log(props.article.id)
    await supabase
        .from('comments')
        .select('*, replies(*)')
        .eq('article', props.article.id)
        .then((res) => {
            for (var i of res.data) {
                comments.push(i)
            }
            isLoading.value = false
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



const channels = supabase.channel('comments')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'comments' },
    (payload) => {
      console.log('Change received!', payload)
      let newObj = payload.new
      newObj.replies = new Array()
      comments.push(newObj)
    }
  )
  .subscribe()


const replyChannels = supabase.channel('replies')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'replies' },
        (payload) => {
            console.log('Change received!', payload)
            for(var i=0;i<comments.length;i++){
                if(comments[i].id == payload.new.comment){
                    comments[i].replies.push(payload.new)
                }
            }
        }
    )
    .subscribe()

</script>

<template>
    <div>
        <div v-if="isLoading" class="spinner-border spinner-border-sm text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else class="commentsList">
            <h5>Comments ({{ comments.length }})</h5>
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