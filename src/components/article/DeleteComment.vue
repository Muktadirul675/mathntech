<script setup>
import { useAuthStore } from '@/stores/authStore';

import { supabase } from '@/lib/supabase';

const props = defineProps({
    comment: Object
})

const authStore = useAuthStore()

async function del() {
    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', props.comment.id)
    if(error){console.log('error ',error)}
}

</script>

<template>
    <div v-if="authStore.logged">
        <div v-if="authStore.loggedUser.email == props.comment.email" @click="del" style="cursor: pointer;">
            <i class="fi fi-rr-trash text-danger"></i>
        </div>
    </div>
</template>
