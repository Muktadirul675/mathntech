import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase.js';
import { useAuthStore } from './authStore.js';
import { useArticleStore } from './articleStore.js';

export const useBookmarkStore = defineStore('bookmarks', () => {
    const articleStore = useArticleStore()
    let bookmarks = reactive([])
    let isLoading = ref(true)
    const authStore = useAuthStore()

    async function getBookmarks() {
        if (authStore.logged) {
            if (authStore.loggedUser) {
                const { data, error } = await supabase.from('bookmarks').select('*, article(*)').eq('email', authStore.loggedUser.email)
                if (error) { console.log('error ', error) } else {
                    console.log(data)
                    if (data.length) {
                        for (var i of data) {
                            i.deleted = false
                            bookmarks.push(i)
                        }
                    }
                    isLoading.value = false
                }
            } else { isLoading.value = true }
        } else {
            isLoading.value = false
        }
    }
    getBookmarks()

    async function add(article) {
        if (authStore.logged) {
            if (authStore.loggedUser) {
                const { error } = await supabase.from('bookmarks').insert({
                    article: article.id,
                    email: authStore.loggedUser.email,
                    type: 'article'
                })
            }
        } else {
            toast.error('Please login to add bookmark', { position: toast.POSITION.TOP_RIGHT })
        }
    }

    async function del(bookmark) {
        const { error } = await supabase.from('bookmarks').delete().eq('id', bookmark.id)
        if (error) {
            console.log('error ', error)
        }
    }

    const channels = supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'bookmarks' },
            (payload) => {
                console.log('Change received!', payload)
                if (payload.eventType == "INSERT") {
                    let article = articleStore.getArticle(payload.new.article)
                    let obj = payload.new
                    obj.article = article
                    obj.deleted = false
                    bookmarks.push(obj)
                }
                if (payload.eventType == "DELETE") {
                    let id = payload.old.id
                    for(var i in bookmarks){
                        if(bookmarks[i].id == id){bookmarks[i].deleted = true}
                    }
                }
            }
        )
        .subscribe()

    return { bookmarks, isLoading, add, del }
})