import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase';
import { useAuthStore } from './authStore';

export const useBookmarkStore = defineStore('bookmarks', () => {
    let authStore = useAuthStore()
    authStore.checkUser()
    let bookmarks = ref(null)
    let userBookmarks = ref(null)

    async function getBookmarks() {
        if (authStore.logged) {
            let { data: sbBookmarks, error } = await supabase
                .from('bookmarks')
                .select(`id,articles(id,title,subject)`)

            if (sbBookmarks) { bookmarks.value = sbBookmarks; }
        } else { bookmarks.value = null }
    }

    async function getUserBookmarks() {
        if (authStore.logged) {
            let { data: sbBookmarks, error } = await supabase
                .from('bookmarks')
                .select(`*,articles(id,title,subject,type)`)
                .eq('email',authStore.loggedUser.email)

            if (sbBookmarks) { userBookmarks.value = sbBookmarks;}
        } else { userBookmarks.value = null }
    }

    getBookmarks()
    getUserBookmarks()

    async function addBookmark(articleId) {
        const { error } = await supabase
            .from('bookmarks')
            .insert([{
                article : articleId,
                email : authStore.loggedUser.email
            }]).then(console.log('added'))
        if(error){console.log('error ',error)}
        getUserBookmarks()
    }

    async function deleteBookmark(id) {
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', id)
        if(error){console.log('error ',error)}
    }

    return { bookmarks, userBookmarks, deleteBookmark, addBookmark }
})