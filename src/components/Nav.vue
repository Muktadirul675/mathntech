<script setup>
import { ref, onBeforeMount } from 'vue';
import { RouterLink } from 'vue-router';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from "@/stores/authStore"

let authStore = useAuthStore()

onBeforeMount(async () => {
    authStore.checkUser()
})

</script>

<template>
    <!-- 416788, F26419, FFEE93, 345995, E9D985 -->
    <div class="container-fluid p-1 navbar-yellow">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="content">
                        <div>
                            <img src="https://res.cloudinary.com/dsfybjdih/image/upload/v1702114953/mathntech/logo_wauvfj.png"
                                alt="" class="logo">
                        </div>
                        <div class="navigation ms-auto">
                            <RouterLink :to="{name:'home'}" class="mx-1 btn btn-warning">
                                <i class="fi fi-rr-home"></i>
                            </RouterLink>
                            <RouterLink :to="{name:'blog'}" class="mx-1 btn btn-warning">
                                <i class="fi fi-br-blog-text"></i>
                            </RouterLink>
                            <button class="btn btn-warning mx-1 text-white" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                <i v-if="authStore.logged" class="fi fi-sr-circle-user"></i>
                                <i v-else class="fi fi-br-sign-in-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- <img src="https://res.cloudinary.com/dsfybjdih/image/upload/v1702114953/mathntech/logo_wauvfj.png" alt=""></img> -->

<style>
.navbar-yellow {
    position: sticky;
    top: 0;
    background-color: var(--yellow);
    z-index: 99 !important;
}

.navbar-yellow .logo {
    height: 80px;
    width: 80px;
}

.content {
    display: flex;
}

.navigation {
    display: flex;
    align-items: center;
    justify-content: end;
}

.navigation a {
    color: white;
}</style>
