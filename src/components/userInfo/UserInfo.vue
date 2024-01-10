<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase.js';
import { useAuthStore } from "@/stores/authStore.js"
import BookmarkList from './BookmarksList.vue';
import Notifications from './Notifications.vue'

let authStore = useAuthStore()
const router = useRouter()
let activeTab = ref(1)
let isSubscribed = ref(null)
const isLogged = computed(() => authStore.loggedUser)
let checked = ref(true)

onBeforeMount(() => {
    authStore.checkUser()
})

function signInWithGoogle() {
    supabase.auth.signInWithOAuth({
        provider: 'google',
    })
}

function activeNotification() {
    activeTab.value = 1
}

function activeBookmark() {
    activeTab.value = 2
}

async function addSubscription() {
    if (authStore.logged) {
        checked.value = null;
        isSubscribed.value = null;
        const { error } = await supabase.from('subscribers').insert([{
            email: authStore.loggedUser.email,
            name: authStore.loggedUser.full_name
        }])
        if (error) { console.log('error ', error); checked.value = false; isSubscribed.value = false; }
        else {
            checked.value = true;
            isSubscribed.value = true;
        }
    } else {
        toast.error("Please login to subscribe!", { position: toast.POSITION.TOP_RIGHT })
    }
}

async function checkSubscription() {
    const { data, error } = await supabase.from('subscribers').select('*').eq('email', authStore.loggedUser.email)
    if (data.length) { isSubscribed.value = true; checked.value = true } else { isSubscribed.value = false; checked.value = false; }
    // console.log(data)
    // console.log(error)
}

async function delSubscription() {
    checked.value = null;
    isSubscribed.value = null;
    const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('email', authStore.loggedUser.email)
    if(error){
        // console.log(error);
        checked.value = true;
        isSubscribed.value = true;
    }else{
        checked.value = false;
        isSubscribed.value = false;
    }

}

watch(isLogged, (newVal, oldVal) => {
    if (newVal == false) { isSubscribed.value = false }
    else {
        checkSubscription()
    }
})

watch(checked, (newVal, oldVal) => {
    if (oldVal == false && newVal == true) {
        addSubscription();
    } else if (oldVal == true && newVal == false) {
        delSubscription();
    }
})

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
                            <img src="https://res.cloudinary.com/dsfybjdih/image/upload/v1702631039/mathntech/email_bx2utz.png"
                                alt="" class="infoIcon">
                            <b>{{ authStore.loggedUser.email }}</b>
                        </div>
                    </div> <br>
                    <button type="button " @click="authStore.logout" class="btn btn-danger mx-1" data-bs-dismiss="offcanvas"
                        aria-label="Close">
                        Logout
                    </button> <br> <br>
                    <div v-if="authStore.isAdmin">
                        <button type="button" aria-label="close" @click="router.push({ name: 'addArticle' })"
                            class="btn btn-success mx-1" data-bs-dismiss="offcanvas">Add Article</button>
                        <button type="button" aria-label="close" @click="router.push({ name: 'addSeries' })"
                            class="btn btn-success mx-1" data-bs-dismiss="offcanvas">Add Series</button>
                    </div>
                </div> <br>
                <div class="p-3 shadow-sm rounded">

                    <div class="newsletter_info">
                        <div>
                            <div>
                                <img class="newsletter_info_img"
                                    src="https://res.cloudinary.com/dsfybjdih/image/upload/v1703680844/mathntech/mail_qkjtlp.png"
                                    alt=""> <b>Newsletter</b> <br>
                                <div v-if="isSubscribed != null">
                                    <small v-show="!isSubscribed">Toggle switch to subscribe</small>
                                    <small v-show="isSubscribed">Subscribed!</small>
                                </div>
                            </div>
                        </div>
                        <span class="mx-2"></span>
                        <div>
                            <div>
                                <div v-if="checked != null" class="form-check form-switch">
                                    <input v-model="checked" class="form-check-input" type="checkbox"
                                        id="flexSwitchCheckDefault">
                                    <!-- <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox
                                                                            input</label> -->
                                </div>
                                <div v-else>
                                    <div class="spinner-border spinner-border-sm text-warning" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="p-0">
                    <div class="custom_tab">
                        <div @click="activeNotification">
                            <template v-if="activeTab == 1">
                                <div class="custom_tab_nav active_tab">
                                    <img class="sideIcon"
                                        src="https://res.cloudinary.com/dsfybjdih/image/upload/v1704801705/mathntech/notification-bell_jvmbzm.png"
                                        alt=""> Notifications
                                </div>
                            </template>
                            <template v-else>
                                <div class="custom_tab_nav">
                                    <img class="sideIcon"
                                        src="https://res.cloudinary.com/dsfybjdih/image/upload/v1704801705/mathntech/notification-bell_jvmbzm.png"
                                        alt=""> Notifications
                                </div>
                            </template>
                        </div>
                        <div @click="activeBookmark">
                            <template v-if="activeTab == 2">
                                <div class="custom_tab_nav active_tab">
                                    <img src="https://res.cloudinary.com/dsfybjdih/image/upload/v1704801705/mathntech/bookmark_ugrfw6.png"
                                        alt="" class="sideIcon"> Bookmarks
                                </div>
                            </template>
                            <template v-else>
                                <div class="custom_tab_nav">
                                    <img src="https://res.cloudinary.com/dsfybjdih/image/upload/v1704801705/mathntech/bookmark_ugrfw6.png"
                                        alt="" class="sideIcon"> Bookmarks
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

.custom_tab>div {
    width: 50%;
    text-align: center;
}

.custom_tab_nav.active_tab {
    border-bottom: transparent;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: rgba(255, 254, 190, 0.939);
}

.custom_tab>div .custom_tab_nav {
    padding: 10px;
}

.custom_tab_body {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 0.5px solid rgba(255, 254, 190, 0.939);
}

.sideIcon {
    height: 30px;
    width: 30px;
}

.newsletter_info {
    display: flex;
    align-items: center;
}

.newsletter_info_img {
    height: 30px;
    width: 30px;
}
</style>
