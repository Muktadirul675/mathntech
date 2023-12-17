<script setup>
import { ref, onBeforeMount } from 'vue';
import { RouterLink } from 'vue-router';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from "@/stores/authStore"
import BookmarkList from './BookmarksList.vue';

let authStore = useAuthStore()

onBeforeMount(() => {
    authStore.checkUser()
})

function signInWithGoogle() {
    supabase.auth.signInWithOAuth({
        provider: 'google',
    })
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
                <button @click="signInWithGoogle">Login</button>
            </div>
            <div v-else>
                <div class="userInfo shadow rounded p-3">
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
                    <button type="button " @click="authStore.logout" class="btn btn-danger" data-bs-dismiss="offcanvas"
                        aria-label="Close">
                        Logout
                    </button>
                </div>
                <BookmarkList></BookmarkList>
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
</style>
