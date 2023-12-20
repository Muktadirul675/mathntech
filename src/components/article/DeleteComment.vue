<script setup>
import { supabase } from '@/lib/supabase';

const props = defineProps({
    comment: Object
})

async function del() {
    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', props.comment.id)
    if(error){console.log('error ',error)}
}

</script>

<template>
    <div @click="del" style="cursor: pointer;">
        <i class="fi fi-rr-trash text-danger"></i>
    </div>
</template>
