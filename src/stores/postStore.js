import { ref,reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase.js';

export const usePostStore = defineStore('posts', () => {
    const articles = reactive([])
    const loading = ref(true)

    async function getArticles() {
        const { data,error } = await supabase.from('articles').select('*').eq('status','public').eq('type','post').order('created_at',{ascending:false})
        if(error){console.log('error ',error)}
        else{
            for(var i of data){
                i.show = true
                articles.push(i)
            }
            loading.value = false
        }
        
    }

    getArticles()


    function getArticle(id) {
        for (var i of articles) {
            if (i.id == id) { return i }
        }
    }

    return { articles, loading, getArticle }
})