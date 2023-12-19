<script setup>
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { computed } from '@vue/reactivity';
import EditComment from './editComment.vue';

const props = defineProps({
    comment: Object
})

const authStore = useAuthStore()
let canEdit = computed(() => {
    if(authStore.logged){
        if (authStore.loggedUser.email == props.comment.email) {
            return true
        } else {
            return false
        }
    }else{
        return false;
    }
})

</script>

<template>
    <div class="comment my-2">
        <div class="header" style="display: flex; align-items: center;">
            <h6 class="nam">{{ comment.name }}</h6>
            <span class="mx-1 text-muted time">{{ new Date(comment.created_at).toDateString() }}</span>
        </div>
        <div class="content px-2">
            {{ comment.comment }}
        </div>
        <div>
            <EditComment v-if="canEdit" :comment="comment"></EditComment>
        </div>
    </div>
</template>

<style>
.time {
    display: none;
}

.comment:hover .time {
    display: inherit;
}
</style>
