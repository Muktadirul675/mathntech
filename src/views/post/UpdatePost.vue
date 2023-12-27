<script setup>
import {  computed, onBeforeMount } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import {usePostStore} from '@/stores/postStore.js';
import {useAuthStore} from '@/stores/authStore.js'
import Loading from '@/components/Loading.vue';
import Form from '@/components/article/articleForm.vue'
 
const route = useRoute();
const router = useRouter()

let authStore = useAuthStore()
let id = route.params.id;
let postStore = usePostStore()
let post = computed(() => {
    if (postStore.loading) { return null; }
    else { return postStore.getArticle(id) }
})

onBeforeMount(()=>{
    if(!(authStore.logged)){router.push({name:'home'})}
    else{if(!(authStore.isAdmin)){router.push({name:'home'})}}
})

</script>

<template>
    <div class="container p-3">
        <div class="row">
            <div class="col">
                <div v-if="post" class="article">
                    <Form :fields="post"></Form>
                </div>
                <Loading v-else></Loading>
            </div>
        </div>
    </div>
</template>