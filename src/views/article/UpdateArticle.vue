<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore';
import Loading from '@/components/Loading.vue';
import { ClassicEditor as ArticleEditor } from '@/lib/ckeditor/articleConfig';
import { ClassicEditor as SimpleEditor } from '@/lib/ckeditor/simpleConfig';

const route = useRoute();

let id = route.params.id;
let articleStore = useArticleStore()
let article = computed(() => {
    if (articleStore.loading) { return null; }
    else { return articleStore.getArticle(id) }
})

let titleEditor = ref(null)
let title = computed(() => {
    let val = article.value.title;
    if(val){
        SimpleEditor.create(document.querySelector("#simpleEditor")).then((editor) => { titleEditor.value = editor; titleEditor.value.setData(val) })
        return val;
    }else{return null}
})
let bodyEditor = ref(null)
let body = computed(() => {
    let val = article.value.body;
    if(val){
        ArticleEditor.create(document.querySelector("#articleEditor")).then((editor) => { bodyEditor.value = editor; bodyEditor.value.setData(val) })
        return val
    }
})
let imgLink = computed(() => article.value.coverImg)
let tagStr = computed(() => article.value.tags)
let subject = computed(() => article.value.subject)
let type = computed(() => article.value.type)
let status = computed(() => article.value.status)

</script>

<template>
    <div class="container p-3">
        <div class="row">
            <div class="col">
                <div v-if="article" class="article">
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
                        <input type="radio" v-model="subject" name="subject" value="math" id=""> Math
                        <input type="radio" v-model="subject" name="subject" value="Programming" id=""> Programming
                        <input type="radio" v-model="subject" name="subject" value="math&programming" id=""> Math &
                        Programming
                        <br><br>
                        <b>Status: </b>
                        <input type="radio" v-model="status" value="public" name="status" id=""> Public
                        <input type="radio" v-model="status" value="hidden" name="status" id=""> Hidden
                    </form>
                </div>
                <Loading v-else></Loading>
            </div>
        </div>
    </div>
</template>
