import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase';

export const useAuthStore = defineStore('auth', () => {
    const logged = ref(false);
    const loggedUser = ref(null)
    const isAdmin = computed(()=>{
        if(logged.value){
            if(loggedUser.value.email == 'muktadirul.05@gmail.com'){return true;}else{return false;}
        }else{return false}
    })

    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) { logged.value = true; loggedUser.value = user.user_metadata } else { logged.value = false; loggedUser.value = null }
    }

    async function logout() {
        const { error } = await supabase.auth.signOut()
        if (error) { console.log(error) }
        checkUser()
    }

    checkUser()


    return { logged, checkUser, logout, loggedUser, isAdmin }
})