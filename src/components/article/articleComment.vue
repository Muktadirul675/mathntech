<script setup>
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { computed, onMounted, ref } from 'vue';
import EditComment from './editComment.vue';
import CommentReplySign from './CommentReplySign.vue';

const props = defineProps({
    comment: Object
})

const authStore = useAuthStore()
// const replies = ref(props.comment.replies)
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

</script>

<template>
    <div :id="`${commentId}`" class="comment my-2">
        <div class="header" style="display: flex; align-items: center;">
            <h5 class="name">{{ comment.name }}</h5>
            <!-- <span class="mx-1 text-muted time">{{ new Date(comment.created_at).toDateString() }}</span> -->
        </div>
        <div class="content ps-2">
            {{ comment.comment }}
        </div>
        <div class="tools" :id="`${commentId}-tools`">
            <EditComment v-if="canEdit" :comment="comment"></EditComment>
            <span class="ms-2"></span>
            <CommentReplySign :comment="comment"></CommentReplySign>
        </div>
        <div v-if="comment.replies" class="repliesList ps-4 mb-2">
            <div v-for="reply in comment.replies" class="reply">
                <h6>

                    {{ reply.name }}

                </h6>
                <span class="ms-2">
                    {{ reply.reply }}
                </span>
            </div>
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
