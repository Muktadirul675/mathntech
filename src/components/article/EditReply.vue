<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabase.js';
const props = defineProps({
    reply: Object
})

const replyId = `reply-${props.reply.id}`
const text = ref(props.reply.reply)
const isLoading = ref(false)

async function update(){
    isLoading.value = true
    const {error} = await supabase.from('replies').update({reply:text.value}).eq('id',props.reply.id)
    if(error){console.log('error ',error)}
    else{isLoading.value =  false; new bootstrap.Collapse(`#${replyId}`).hide()}
}

</script>

<template>
    <span class="edit text-primary" data-bs-toggle="collapse" :href="`#${replyId}`" role="button" aria-expanded="false"
        :aria-controls="replyId">
        <i class="fi fi-tr-pen-field mx-2"></i>
    </span>
    <div class="collapse" :id="replyId">
        <form class="form-group" @submit.prevent="update">
            <div class="inputs">
                <textarea class="form-control" v-model="text" name="" id=""></textarea>
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
</template>

<style scoped>
.inputs {
    display: flex;
}

.form-group{width: fit-content;}

</style>
