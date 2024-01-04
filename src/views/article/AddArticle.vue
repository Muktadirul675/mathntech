<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/authStore.js';
import { ClassicEditor as ArticleEditor } from '@/lib/ckeditor/articleConfig.js';
import { ClassicEditor as SimpleEditor } from '@/lib/ckeditor/simpleConfig.js';
import { supabase } from '@/lib/supabase.js';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter()
let authStore = useAuthStore()
let titleEditor = ref(null);
let bodyEditor = ref(null);
let imgLink = ref(null);
let tagStr = ref(null);
let time = ref(null);
let subject = ref(null);
let type = ref(null);
let status = ref(null);

async function add() {
    const { error } = await supabase
        .from('articles')
        .insert({
            title: titleEditor.value.getData(),
            body: bodyEditor.value.getData(),
            coverImg: imgLink.value,
            tags: tagStr.value,
            subject: subject.value,
            type: type.value,
            status: status.value,
        })
    if(error){console.log('error ',error)}else{toast.success("Article added",{position:toast.POSITION.TOP_RIGHT})}

}

onMounted(() => {
    SimpleEditor.create(document.querySelector("#simpleEditor")).then((editor) => { titleEditor.value = editor })
    ArticleEditor.create(document.querySelector("#articleEditor")).then((editor) => { bodyEditor.value = editor })
})

onBeforeMount(() => {
    if(!(authStore.logged)){router.push({name:'home'})}
    else{if(!(authStore.isAdmin)){router.push({name:'home'})}}
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
                    <div v-if="type != 'post'">
                        <b>Cover Photo link</b>
                        <input type="text" name="" v-model="imgLink" class="form-control" id=""><br> <br>
                    </div>
                    <b>Title</b>
                    <textarea id="simpleEditor" rows="2" cols="30"></textarea><br> <br>
                    <b>Body</b>
                    <textarea id="articleEditor" cols="30" rows="10"></textarea><br> <br>
                    <b>Tags</b>
                    <input type="text" v-model="tagStr" name="" class="form-control" id=""><br> <br>
                    <b>Subject: </b>
                    <input type="radio" v-model="subject" name="subject" value="Math" id=""> Math
                    <input type="radio" v-model="subject" name="subject" value="Programming" id=""> Programming
                    <input type="radio" v-model="subject" name="subject" value="Math & Programming" id=""> Math & Programming
                    <br><br>
                    <b>Status: </b>
                    <input type="radio" v-model="status" value="public" name="status" id=""> Public
                    <input type="radio" v-model="status" value="hidden" name="status" id=""> Hidden
                </form>
                <button @click="add">Add</button>
            </div>
        </div>
    </div>
</template>
