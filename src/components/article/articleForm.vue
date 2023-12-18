<script setup>
import { onMounted, ref } from 'vue';
import { ClassicEditor as ArticleEditor } from '@/lib/ckeditor/articleConfig';
import { ClassicEditor as SimpleEditor } from '@/lib/ckeditor/simpleConfig';
import { supabase } from '@/lib/supabase';

const props = defineProps({
  fields: Object
})

let loading = ref(false)
let id = props.fields.id;
let type = ref(props.fields.type)
let title = ref(props.fields.title);
let body = ref(props.fields.body);
let coverImg = ref(props.fields.coverImg)
let subject = ref(props.fields.subject)
let status = ref(props.fields.status)
let tags = ref(props.fields.tags)

let titleEditor = ref(null)
let bodyEditor = ref(null)

onMounted(() => {
  SimpleEditor.create(document.querySelector("#simpleEditor")).then((editor) => { titleEditor.value = editor; titleEditor.value.setData(title.value) })
  ArticleEditor.create(document.querySelector("#articleEditor")).then((editor) => { bodyEditor.value = editor; bodyEditor.value.setData(body.value) })
})

async function update() {
  loading.value = true;
  const { error } = await supabase
    .from('articles')
    .update({
      title: titleEditor.value.getData(),
      body: bodyEditor.value.getData(),
      type: type.value,
      subject: subject.value,
      coverImg: coverImg.value,
      status: status.value,
      tags: tags.value,
    })
    .eq('id', id)
    if(error){console.log(error)}

}

</script>

<template>
  <form class="form-group">
    <b>Type: </b>
    <input type="radio" value="article" v-model="type" name="type" id=""> Article
    <input type="radio" value="post" v-model="type" name="type" id=""> Post
    <br><br>
    <div v-if="type != 'post'">
      <b>Cover Photo link</b>
      <input type="text" name="" v-model="coverImg" class="form-control" id=""><br> <br>
    </div>
    <b>Title</b>
    <textarea id="simpleEditor" rows="2" cols="30"></textarea><br> <br>
    <b>Body</b>
    <textarea id="articleEditor" cols="30" rows="10"></textarea><br> <br>
    <b>Tags</b>
    <input type="text" v-model="tags" name="" class="form-control" id=""><br> <br>
    <b>Subject: </b>
    <input type="radio" v-model="subject" name="subject" value="math" id=""> Math
    <input type="radio" v-model="subject" name="subject" value="Programming" id=""> Programming
    <input type="radio" v-model="subject" name="subject" value="math&programming" id=""> Math &
    Programming
    <br><br>
    <b>Status: </b>
    <input type="radio" v-model="status" value="public" name="status" id=""> Public
    <input type="radio" v-model="status" value="hidden" name="status" id=""> Hidden
  </form> <br>
  <div>
    <div v-if="loading" class="spinner-border text-warning" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <button v-else class="btn btn-warning" @click="update">Update</button>
  </div>
</template>
