<script setup>
import { useAuthStore } from '@/stores/authStore.js';
import { ref } from 'vue';
import { supabase } from '@/lib/supabase.js';

const props = defineProps({
    reply: Object
})

const authStore = useAuthStore()
const isDeleting = ref(false)

async function del() {
    isDeleting.value = true
    const { error } = await supabase
        .from('replies')
        .delete()
        .eq('id', props.reply.id)
    if (error) { console.log('error ', error) }else{isDeleting.value=false}
}

</script>

<template>
    <div v-if="authStore.logged">
        <div v-if="isDeleting">
            <div class="spinner-border spinner-border-sm text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <div v-if="authStore.loggedUser.email == props.reply.email" @click="del" style="cursor: pointer;">
                <i class="fi fi-rr-trash text-danger"></i>
            </div>
        </div>
    </div>
</template>