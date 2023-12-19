<script setup>
const props = defineProps({
    reply: Object
})


</script>

<template>
    <div class="reply">
        <h6>{{ reply.full_name }}</h6> 
        <span>{{ reply.reply }}</span>
    </div>
</template>
