<script setup>
const props = defineProps({
    article : Object
})

let article = props.article

</script>

<template>
    <div class="bookmarkItem p-3 my-1 container-fluid">
        <div class="row">
            <div class="col-10">
                {{ article.articles.title }}
            </div>
        </div>
    </div>
</template>
