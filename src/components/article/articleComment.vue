<script setup>
import { supabase } from '@/lib/supabase';

const props = defineProps({
    comment : Object
})

</script>

<template>
    <div class="comment my-1">
        <div class="header" style="display: flex; align-items: center;">
            <span class="name" style="font-size: large;">{{ comment.name }}</span>
            <span class="mx-1 text-muted time">{{ new Date(comment.created_at).toDateString() }}</span>
        </div>
        <div class="content px-2">
            {{ comment.comment }}
        </div>
    </div>
</template>

<style>
    .time{
        display: none;
    }
    .comment:hover .time{
        display: inherit;
    }
</style>
