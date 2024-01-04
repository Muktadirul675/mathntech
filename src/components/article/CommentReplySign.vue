<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabase.js';
import { useAuthStore } from '@/stores/authStore.js';
import { toast } from 'vue3-toastify'

const props = defineProps({
    comment: Object
})

const authStore = useAuthStore()
const replyBoxId = `reply-box-${props.comment.id}`
const text = ref(null)
const isLoading = ref(false)

function canAdd(cmnt) {
    var allow = false
    var allowedStr = ''
    if(!(cmnt == null)){
        for (var i = 0; i < cmnt.length; i++) {
            if (!(cmnt[i] == ' ')) {
                allow = true
                allowedStr = cmnt.substr(i)
            }
        }
    }
    return { allow, allowedStr }
}


async function add() {
    if (authStore.logged) {
        let allowed = true
        if(allowed){
            isLoading.value = true
            const { error } = await supabase.from('replies').insert([{
                comment: props.comment.id,
                reply: text.value,
                email: authStore.loggedUser.email,
                name: authStore.loggedUser.full_name
            }])
            if (error) { console.log('error ', error) }
            else { isLoading.value = false; new bootstrap.Collapse(`#${replyBoxId}`).hide(); text.value = '' }
        }else{toast.error("Reply can't be empty",{position:toast.POSITION.TOP_RIGHT})}
    } else {
        toast.error('Please login to add reply', { position: toast.POSITION.TOP_RIGHT })
    }
}

</script>

<template>
    <div>
        <a class="text-warning" data-bs-toggle="collapse" :href="`#${replyBoxId}`" role="button" aria-expanded="false"
            :aria-controls="replyBoxId">
            <i class="fi fi-tr-share-square"></i>
        </a>
    </div>

    <div class="collapse" :id="replyBoxId">
        <form class="form-group" @submit.prevent="add">
            <div class="inputs">
                <textarea v-model="text" name="" placeholder="Reply..." class="form-control" id=""></textarea>
                <div>
                    <div v-if="isLoading" class="spinner-border spinner-border-sm text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <button v-else class="btn btn-warning">
                        <i class="fi fi-tr-inbox-out"></i>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.form-group {
    width: fit-content;
}

.inputs {
    display: flex;
}
</style>
