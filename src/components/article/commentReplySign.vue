<script setup>
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue';
const props = defineProps({
    comment: Object
})

const replyId = `reply-${props.comment.id}`
const text = ref('')
const isLoading = ref(false)
const authStore = useAuthStore()

async function add() {
    if(authStore.logged){
        isLoading.value = true
        const { data,error } = await supabase.from('replies').insert([{
            comment: props.comment.id,
            reply: text.value,
            email: authStore.loggedUser.email,
            full_name: authStore.loggedUser.full_name
        }]).select()
        if(error){console.log('error ',error)}else{
            isLoading.value = false;text.value="";new bootstrap.Collapse(`#${replyId}-box`).hide()
        }
    }
}

{/* <i class="fi fi-tr-share-square"></i> */ }
</script>

<template>
    <div :id="replyId" class="reply">
        <span class="edit text-primary" data-bs-toggle="collapse" :href="`#${replyId}-box`" role="button"
            aria-expanded="false" :aria-controls="`${replyId}-box`">
            <i class="fi fi-tr-share-square"></i>
        </span>
        <div class="collapse" :id="`${replyId}-box`">
            <div class="">
                <div class="form">
                    <form @submit.prevent="add" class="form-group">
                        <div class="inputs">
                            <textarea v-model="text" type="text" name="" id="" placeholder="Reply"
                                class="form-control"></textarea>
                            <div>
                                <div v-if="isLoading" class="spinner-border spinner-border-sm text-warning" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <button v-else type="submit" class="btn btn-warning">
                                    <i class="fi fi-tr-inbox-out"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.inputs {
    display: flex;
}
</style>
