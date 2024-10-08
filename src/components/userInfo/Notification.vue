<script setup>
import { supabase } from '@/lib/supabase';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const props = defineProps({
    notification: Object
})

const type = props.notification.type
let obj = ref(null);
let router = useRouter()

async function getPost(id) {
    // const { data, error } = await supabase.from('articles').select('*').eq('id', id)
    obj.value = props.notification.post
}

async function getArticle(id) {
    // const { data, error } = await supabase.from('articles').select('*').eq('id', id)
    obj.value = props.notification.article
}

async function getSeries(id) {
    // const { data, error } = await supabase.from('series').select('*').eq('id', id)
    obj.value = props.notification.series
}

async function getComment(id) {
    // const { data, error } = await supabase.from('comments').select('*, article(*)').eq('id', id)
    obj.value = props.notification.comment
}

async function getReply(id) {
    // const { data, error } = await supabase.from('replies').select('*, comment(*, article(*))').eq('id', id)
    obj.value = props.notification.reply
}

switch (type) {
    case 'addPost':
        getPost(props.notification.typeId)
        break;
    case 'addArticle':
        getArticle(props.notification.typeId)
        break;
    case 'addSeries':
        getSeries(props.notification.typeId)
        break;
    case 'addComment':
        getComment(props.notification.typeId)
        break;
    case 'addReply':
        getReply(props.notification.typeId)
    default:
        break;
}

async function check() {
    // console.log('checking')
    if (!(props.notification.checked)) {
        const { error } = await supabase.from('notifications').update({ checked: true }).eq('id', props.notification.id)
        if (error) { console.log('error ', error) }
    }
}

function navigate(path) {
    check();
    router.push(path)
}

</script>

<template>
    <div style="position: relative;" class="notification mb-2 shadow-sm p-3">
        <template v-if="!props.notification.checked">
            <span
                class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                <span class="visually-hidden">New alerts</span>
            </span>
        </template>

        <template v-if="obj">
            <template v-if="type == 'addPost'">
                <div class="container-fluid" data-bs-dismiss="offcanvas" aria-label="Close">
                    <div class="row">
                        <div class="col-1">
                            <span class="text-warning me-2">
                                <i class="fi fi-rr-square-quote"></i>
                            </span>
                        </div>
                        <div class="col-10">
                            <b>New Post</b>
                            <p>
                                <span class="navigateText"
                                    @click="navigate({ name: 'post', params: { id: props.notification.typeId } })"
                                    v-html="obj.title"></span>
                                <span class="px-2 py-1 bg-warning text-white"
                                    style="border-radius: 30px; font-size: smaller;">{{ obj.subject }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="type == 'addArticle'">
                <div class="container-fluid" data-bs-dismiss="offcanvas" aria-label="Close">
                    <div class="row">
                        <div class="col-1">
                            <span class="text-warning me-2">
                                <i class="fi fi-rr-blog-text"></i>
                            </span>
                        </div>
                        <div class="col-10">
                            <b>New Article</b>
                            <p>
                                <span class="navigateText"
                                    @click="navigate({ name: 'article', params: { id: props.notification.typeId } })"
                                    v-html="obj.title"></span> <br>
                                <span class="px-2 py-1 bg-warning text-white"
                                    style="border-radius: 30px; font-size: smaller;">{{ obj.subject }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="type == 'addComment'">
                <div class="container-fluid" data-bs-dismiss="offcanvas" aria-label="Close">
                    <div class="row">
                        <div class="col-1">
                            <span class="text-warning me-2">
                                <i class="fi fi-rr-comments"></i>
                            </span>
                        </div>
                        <div class="col-10">
                            <p> <b>{{ obj.name }}</b> Commented <b>"{{ obj.comment }}"</b> on</p>
                            <p>
                                <span class="navigateText"
                                    @click="navigate({ name: 'article', params: { id: obj.article.id } })"
                                    v-if="obj.article.type == 'article'" v-html="obj.article.title"></span>
                                <span class="navigateText"
                                    @click="navigate({ name: 'post', params: { id: obj.article.id } })"
                                    v-if="obj.article.type == 'post'" v-html="obj.article.title"></span>
                                <span class="px-2 py-1 bg-warning text-white"
                                    style="border-radius: 30px; font-size: smaller;">{{ obj.article.subject }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="type == 'addSeries'">
                <div class="container-fluid" data-bs-dismiss="offcanvas" aria-label="Close">
                    <div class="row">
                        <div class="col-1">
                            <span class="text-warning me-2">
                                <i class="fi fi-rr-rectangle-list"></i>
                            </span>
                        </div>
                        <div class="col-10">
                            <b>New Series</b>
                            <p>
                                <span class="navigateText" @click="navigate({ name: 'series', params: { id: obj.id } })"
                                    v-html="obj.title"></span>
                                <span class="px-2 py-1 bg-warning text-white"
                                    style="border-radius: 30px; font-size: smaller;">{{ obj.subject }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="type == 'addReply'">
                <div class="container-fluid" data-bs-dismiss="offcanvas" aria-label="Close">
                    <div class="row">
                        <div class="col-1">
                            <span class="text-warning me-2">
                                <i class="fi fi-tr-share-square"></i>
                            </span>
                        </div>
                        <div class="col-10">
                            <span><b>{{ obj.name }}</b> replied <b>"{{ obj.reply }}"</b> to <span
                                    v-if="props.notification.notifyTo == 'muktadirul.05@gmail.com' && obj.comment.email != 'muktadirul.05@gmail.com'">a</span>
                                <span v-else>your</span> comment <b>"{{ obj.comment.comment }}"</b></span> on
                            <p>
                                <span class="navigateText"
                                    @click="navigate({ name: 'article', params: { id: obj.comment.article.id } })"
                                    v-html="obj.comment.article.title"></span>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<style scoped>
.navigateText {
    color: #0d6efd;
    cursor: pointer;
}</style>
