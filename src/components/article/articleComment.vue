<script setup>
import { useAuthStore } from '@/stores/authStore.js';
import { computed } from 'vue';
import EditComment from './editComment.vue';
import CommentReplySign from './CommentReplySign.vue';
import EditReply from './EditReply.vue';
import DeleteComment from './DeleteComment.vue';
import DeleteReply from './DeleteReply.vue';

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
            <h5 class="name">{{ props.comment.name }}</h5>
            <!-- <span class="mx-1 text-muted time">{{ new Date(comment.created_at).toDateString() }}</span> -->
        </div>
        <div class="content ps-2">
            {{ props.comment.comment }}
        </div>
        <div class="tools" :id="`${commentId}-tools`">
            <EditComment v-if="canEdit" :comment="props.comment"></EditComment>
            <span class="mx-2"></span>
            <CommentReplySign :comment="props.comment"></CommentReplySign>
            <span class="mx-2"></span>
            <DeleteComment :comment="props.comment"></DeleteComment>
        </div>
        <div v-if="props.comment.replies" class="repliesList ps-4 mb-2">
            <div v-for="reply in props.comment.replies" class="reply">
                <div v-if="!reply.deleted">
                    <h6>
                        {{ reply.name }}
                    </h6>
                    <span class="ms-2">
                        {{ reply.reply }}
                    </span> <br>
                    <span v-if="authStore.logged">
                        <div style="display: flex;" v-if="authStore.loggedUser.email == reply.email">
                            <EditReply  :reply="reply"></EditReply>
                            <span class="mx-2"></span>
                            <DeleteReply :reply="reply"></DeleteReply>
                        </div>
                    </span>
                </div>
                <!-- <RouterLink :to="{name:'article',params:{id:164}}">article 164</RouterLink> -->
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
