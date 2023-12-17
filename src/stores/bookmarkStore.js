import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase';
import { useAuthStore } from './authStore';

export const useBookmarkStore = defineStore('bookmarks', () => {
    let authStore = useAuthStore()
    authStore.checkUser()
    let bookmarks = ref(null)
    let userBookmarks = computed(() => {
        if (bookmarks.value) {
            return bookmarks.value.filter((obj) => {
                return obj.email == authStore.loggedUser.email
            })
        } else { return null; }
    })

    async function getBookmarks() {
        if (authStore.logged) {
            let { data: sbBookmarks, error } = await supabase
                .from('bookmarks')
                .select(`*,articles(id,title,subject,type)`)

            if (sbBookmarks) { bookmarks.value = sbBookmarks; console.log(bookmarks.value) }
        } else { bookmarks.value = null }
    }

    getBookmarks()

    return { bookmarks, userBookmarks }
})