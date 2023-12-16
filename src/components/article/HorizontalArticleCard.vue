<script setup>

let props = defineProps({
    article: Object
})
let article = props.article;

</script>

<template>
    <div class="articleCard p-3 shadow-sm">
        {{ article.title }}
    </div>
</template>


