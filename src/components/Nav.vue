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
    <div id="navbar" class="container-fluid shadow-sm">
        <nav class="container">
            <div class="row p-1">
                <div class="col-12">
                    <div class="bar">
                        <div class="brand">
                            <img src="https://res.cloudinary.com/dsfybjdih/image/upload/v1702114953/mathntech/logo_wauvfj.png"
                                alt="" class="icon">
                        </div>
                        <div class="navigation ms-auto">
                            <RouterLink class="btn btn-warning mx-1" to="/"><i class="fi fi-rr-home"></i></RouterLink>
                            <RouterLink class="btn btn-warning mx-1" to="/blog"><i class="fi fi-br-blog-text"></i>
                            </RouterLink>
                            <button v-if="authStore.logged" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                                class="btn btn-warning mx-1">
                                <i class="fi fi-bs-circle-user"></i>
                            </button>
                            <button v-else type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight" class="btn btn-warning mx-1">
                                <i class="fi fi-br-sign-in-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
#navbar {
    background-color: #FFDE59;
    position: sticky;
    top: 0;
    left: 0;
}

.bar {
    display: flex;
    align-items: center;
}

#navbar .bar .brand .icon {
    width: 80px;
    height: 80px;
}

#navbar .bar .navigation a,
#navbar .bar .navigation button {
    text-decoration: none;
    color: white;
}
</style>
