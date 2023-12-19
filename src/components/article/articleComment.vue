<script setup>
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { computed, onMounted } from 'vue';
import EditComment from './editComment.vue';
import CommentReplySign from './commentReplySign.vue';
import CommentReplyList from './commentReplyList.vue';

const props = defineProps({
    comment: Object
})

const authStore = useAuthStore()
const commentId = `comment-${props.comment.id}`
let canEdit = computed(() => {
    if (authStore.logged) {
        if (authStore.loggedUser.email == props.comment.email) {
            return true
        } else {
            return false
        }
    } else {
        return false;
    }
})

// onMounted(()=>{
//     document.getElementById(`${commentId}`).addEventListener('mouseover',()=>{
//         console.log('in')
//         new bootstrap.Collapse(`#${commentId}-tools`).show()
//     })
//     document.getElementById(`${commentId}`).addEventListener('mouseout',()=>{
//         console.log('out')
//         new bootstrap.Collapse(`#${commentId}-tools`).hide()
//     })
// })

</script>

<template>
    <div :id="`${commentId}`" class="comment my-2">
        <div class="header" style="display: flex; align-items: center;">
            <h5 class="name">{{ comment.name }}</h5>
            <!-- <span class="mx-1 text-muted time">{{ new Date(comment.created_at).toDateString() }}</span> -->
        </div>
        <div class="content px-2">
            {{ comment.comment }}
        </div>
        <div class="tools" :id="`${commentId}-tools`">
            <EditComment v-if="canEdit" :comment="comment"></EditComment>
            <span class="mx-2"></span>
            <!-- <CommentReplySign :comment="comment"></CommentReplySign> -->
        </div>
        <!-- <div class="ps-4">
            <CommentReplyList :comment="comment"></CommentReplyList>
        </div> -->
    </div>
</template>

<style scoped>
.time {
    display: none;
}

.comment:hover .time {
    display: inherit;
}

.comment .tools {
    display: flex;
}
</style>
