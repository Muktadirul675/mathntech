<script setup>
import { supabase } from '@/lib/supabase';
import { ref } from 'vue';
import CommentReply from './commentReply.vue';

const props = defineProps({
    comment: Object
})

let replies = ref(null)

async function getReplies() {
    const { data, error } = await supabase.from('replies').select('*').eq('comment', props.comment.id)
    if (error) { console.log('error ', error) }
    else { replies.value = data }
}

getReplies()

const channels = supabase.channel('custom-all-channel')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'replies' },
        (payload) => {
            console.log('Change received!', payload)
            if(payload.eventType == 'INSERT'){
                replies.value.push(payload.new)
            }
        }
    )
    .subscribe()

</script>

<template>
    <div class="replies">
        <div v-for="reply in replies">
            <CommentReply :reply="reply"></CommentReply>
        </div>
    </div>
</template>
