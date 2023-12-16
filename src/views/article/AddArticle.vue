<script setup>
import { ref, onMounted } from 'vue';
import { ClassicEditor as ArticleEditor } from '@/lib/ckeditor/articleConfig';
import { ClassicEditor as SimpleEditor } from '@/lib/ckeditor/simpleConfig'

let titleEditor = ref(null);
let bodyEditor = ref(null);
let imgLink = ref(null);
let tagStr = ref(null);
let time = ref(null);
let subject = ref(null);
let type = ref(null);
let status = ref(null);

onMounted(() => {
    SimpleEditor.create(document.querySelector("#simpleEditor")).then((editor)=>{titleEditor.value=editor})
    ArticleEditor.create(document.querySelector("#articleEditor")).then((editor)=>{bodyEditor.value=editor})
})

</script>

<template>
    <div class="container addArticle p-3">
        <div class="row">
            <div class="col">
                <form class="form-group">
                    <b>Type: </b> 
                    <input type="radio" value="article" v-model="type" name="type" id=""> Article 
                    <input type="radio" value="post" v-model="type" name="type" id=""> Post 
                    <br><br>
                    <div v-if="type!='post'">
                        <b>Cover Photo link</b> 
                        <input type="text" name="" class="form-control" id=""><br> <br>
                    </div>
                    <b>Title</b> 
                    <textarea id="simpleEditor" rows="2" cols="30"></textarea><br> <br>
                    <b>Body</b> 
                    <textarea id="articleEditor" cols="30" rows="10"></textarea><br> <br>
                    <b>Tags</b> 
                    <input type="text" name="" class="form-control" id=""><br> <br>
                    <b>Subject: </b>
                    <input type="radio" name="subject" value="math" id=""> Math
                    <input type="radio" name="subject" value="Programming" id=""> Programming
                    <input type="radio" name="subject" value="math&programming" id=""> Math & Programming
                    <br><br>
                    <b>Status: </b>
                    <input type="radio" v-model="status" value="public" name="status" id=""> Public
                    <input type="radio" v-model="status" value="hidden" name="status" id=""> Hidden
                </form>
            </div>
        </div>
    </div>
</template>
