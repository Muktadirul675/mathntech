<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase.js';
import { useAuthStore } from "@/stores/authStore.js"
import BookmarkList from './BookmarksList.vue';
import Notifications from './Notifications.vue'

let authStore = useAuthStore()
const router = useRouter()
let activeTab = ref(1)

onBeforeMount(() => {
    authStore.checkUser()
})

function signInWithGoogle() {
    supabase.auth.signInWithOAuth({
        provider: 'google',
    })
}

function activeNotification(){
    activeTab.value = 1
}

function activeBookmark(){
    activeTab.value = 2
}

</script>

<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div v-if="!authStore.logged" class="loginButtons">
                <div @click="signInWithGoogle" class="p-3 d-flex justify-content-center border rounded align-items-center "
                    style="cursor: pointer;">
                    <img height="40px" width="40px"
                        src="https://res.cloudinary.com/dsfybjdih/image/upload/v1703335852/mathntech/google_obuzl4.png"
                        class="img-thumbnail rounded-circle mx-2" alt=""> Login With Google
                </div>
            </div>
            <div v-else>
                <div class="userInfo shadow-sm rounded p-3">
                    <div class="infoImg">
                        <img class="profileImg rounded-circle img-thumbnail" :src="authStore.loggedUser.picture" alt="">
                    </div>
                    <div class="infoGroup">
                        <div class="info">
                            <img class="infoIcon"
                                src="https://res.cloudinary.com/dsfybjdih/image/upload/v1702631163/mathntech/user_c8pdwq.png"
                                alt="">
                            <b>{{ authStore.loggedUser.full_name }}</b>
                        </div>
                        <div class="info">
                            <img class="infoIcon"
                                src="https://res.cloudinary.com/dsfybjdih/image/upload/v1702631039/mathntech/email_bx2utz.png"
                                alt="">
                            <b>{{ authStore.loggedUser.email }}</b>
                        </div>
                    </div> <br>
                    <button type="button " @click="authStore.logout" class="btn btn-danger mx-1" data-bs-dismiss="offcanvas"
                        aria-label="Close">
                        Logout
                    </button>
                    <div v-if="authStore.isAdmin">
                        <button type="button" aria-label="close" @click="router.push({ name: 'addArticle' })"
                            class="btn btn-success mx-1" data-bs-dismiss="offcanvas">Add Article</button>
                        <button type="button" aria-label="close" @click="router.push({ name: 'addSeries' })"
                            class="btn btn-success mx-1" data-bs-dismiss="offcanvas">Add Series</button>
                    </div>
                </div> <br>
                <div class="p-0">
                    <div class="custom_tab">
                        <div @click="activeNotification">
                            <template v-if="activeTab == 1">
                                <div class="custom_tab_nav active_tab">
                                    Notifications
                                </div>
                            </template>
                            <template v-else>
                                <div class="custom_tab_nav">
                                    Notifications
                                </div>
                            </template>
                        </div>
                        <div @click="activeBookmark">
                            <template v-if="activeTab == 2">
                                <div class="custom_tab_nav active_tab">
                                    Bookmarks
                                </div>
                            </template>
                            <template v-else>
                                <div class="custom_tab_nav">
                                    Bookmarks
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="custom_tab_body p-3">
                        <Notifications v-if="activeTab == 1"></Notifications>
                        <BookmarkList v-if="activeTab == 2"></BookmarkList>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.userInfo .infoImg {
    display: flex;
    /* width: 100%; */
    justify-content: center;
}

.userInfo .infoImg .profileImg {
    height: 130px;
    width: 130px;
}

.userInfo .infoGroup .info {
    margin-top: 8px;
    margin-bottom: 8px;
}

.userInfo .infoGroup .info .infoIcon {
    height: 30px;
    widows: 30px;
    margin-right: 5px;
}

.custom_tab {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    cursor: pointer;
    /* background-color: rgba(255, 254, 220, 0.939); */
}

.custom_tab > div{
    width: 50%;
    text-align: center;
}

.custom_tab_nav.active_tab {
    border-bottom: transparent;
    border-top-right-radius: 10px; border-top-left-radius: 10px;
    background-color: rgba(255, 254, 190, 0.939);
}

.custom_tab > div .custom_tab_nav{
    padding: 10px;
}

.custom_tab_body{
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 0.5px solid rgba(255, 254, 190, 0.939);
}

</style>
