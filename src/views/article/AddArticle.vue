<script setup>
import { ref, onMounted } from 'vue';
import { ClassicEditor as ArticleEditor } from '@/lib/ckeditor/articleConfig';
import { ClassicEditor as SimpleEditor } from '@/lib/ckeditor/simpleConfig'

let editor = ref(null);

onMounted(() => {
    SimpleEditor.create(document.querySelector("#simpleEditor"))
    ArticleEditor.create(document.querySelector("#articleEditor"))
})

</script>

<template>
    <div class="container addArticle p-3">
        <div class="row">
            <div class="col">
                <form class="form-group">
                    <p>Title</p>
                    <textarea type="text" id="simpleEditor" rows="2" cols="30" name="title"></textarea>
                </form>
            </div>
        </div>
    </div>
    <textarea name="" id="articleEditor" cols="30" rows="10"></textarea>
</template>
