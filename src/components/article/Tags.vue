<script setup>
const props = defineProps({
    article: Object,
})

let tags = props.article.tags;
let arr = tags.split(',')

</script>

<template>
    <div class="tags">
        <img src="https://res.cloudinary.com/dsfybjdih/image/upload/v1702746042/mathntech/supermarket_atggp0.png" height="15px" width="15px" alt="" class="mx-1">
        <small class="bg-ash px-2 px-1 mx-1 rounded" style="display: inline-block;font-size: smaller;" v-for="tag in arr">{{ tag }}</small>
    </div>
</template>

<style>
.bg-ash{
    background-color: rgb(232, 232, 232);
}


</style>