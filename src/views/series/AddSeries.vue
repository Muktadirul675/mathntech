<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { ClassicEditor as SimpleEditor } from '@/lib/ckeditor/seriesTitleConfig';
import { ClassicEditor as BodyEditor } from '@/lib/ckeditor/seriesBodyConfig';

const simpleEditor = ref(null)
const bodyEditor = ref(null)
const coverImg = ref('')
const articleIds = ref('')
const tags = ref('')
const isLoading = ref(false)

onMounted(() => {
    SimpleEditor.create(document.querySelector("#simpleEditor")).then(editor => {
        simpleEditor.value = editor
    })
    BodyEditor.create(document.querySelector("#bodyEditor")).then(editor => {
        bodyEditor.value = editor
    })
})

async function addSeries() {
    isLoading.value = true
    let ids = []
    for (var i of articleIds.value.split(',')) {
        ids.push(parseInt(i))
    }
    const { data, error } = await supabase.from('series').insert([{
        title: simpleEditor.value.getData(),
        body: bodyEditor.value.getData(),
        coverImg: coverImg.value,
        articles: ids,
        tags: tags.value,
    }])
    if (error) { console.log('error ', error) } else { isLoading.value = false }
}

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-12 p-3">
                <h3>Add series</h3>
                <form @submit.prevent="addSeries" class="form-group">
                    <b>Cover Image</b> <br>
                    <input type="text" v-model="coverImg" name="" id="coverImg" class="form-control"> <br>
                    <b>Title</b> <br>
                    <input type="text" name="" id="simpleEditor"> <br>
                    <b>Body</b>
                    <input type="text" name="" id="bodyEditor"> <br>
                    <b>Article ids</b>
                    <input type="text" v-model="articleIds" class="form-control">
                    <b>Tags</b> <br>
                    <input type="text" v-model="tags" class="form-control"> <br>
                    <div v-if="isLoading" class="spinner-border spinner-border-sm text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <button v-else type="submit" class="btn btn-warning">
                        Add
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
