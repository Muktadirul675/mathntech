<script setup>
import { supabase } from '@/lib/supabase.js';
import { useAuthStore } from '@/stores/authStore.js';
import { ref, watch, computed } from 'vue'
import { toast } from 'vue3-toastify';

let authStore = useAuthStore()
let isLogged = computed(() => authStore.logged)
let isSubscribed = ref(null)

async function checkSubscription() {
    const { data,error } = await supabase.from('subscribers').select('*').eq('email', authStore.loggedUser.email).limit(1).single()
    if(data){isSubscribed.value = true;}else{isSubscribed.value=false;}
    // console.log(data)
    // console.log(error)
}

watch(isLogged, (newVal, oldVal) => {
    if (newVal == false) { isSubscribed.value = false }
    else {
        checkSubscription()
    }
})

async function addSubscription() {
    if (authStore.logged) {
        const { error } = await supabase.from('subscribers').insert([{
            email: authStore.loggedUser.email,
            full_name: authStore.loggedUser.full_name
        }])
        if (error) { console.log('error ', error) }
    } else {
        toast.error("Please login to subscribe!", { position: toast.POSITION.TOP_RIGHT })
    }
}

</script>

<template>
    <div class="container-fluid my-1 shadow-sm p-3">
        <div class="row">
            <div class="col-12">
                <img src="https://res.cloudinary.com/dsfybjdih/image/upload/v1703680844/mathntech/mail_qkjtlp.png"
                    width="30px" height="30px" class="rounded-circle mx-1" alt="">
                <b>Newsletter!</b> <br>
                <small>Get email alerts for important articles and serieses!</small>
                
                <!-- <div v-if="isSubscribed != null">
                    <div v-if="isSubscribed">
                        <b>Subscribed!</b>
                    </div>
                    <div v-else>
                        <button @click="addSubscription" class="btn btn-warning">Subscribe</button>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
