import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase';

export const useArticleStore = defineStore('articles', () => {
    const articles = ref(null)
    const publicArticles = computed(()=>{
        if(articles.value){
            return articles.value.filter((obj)=>{
                return obj.status == 'public'
            })
        }
    })
    const loading = computed(() => {
        return ((articles.value == null))
    })

    async function getArticles() {
        const { data, error } = await supabase.from('articles').select()
        articles.value = data
    }

    getArticles()

    function getArticle(id) {
        for (var i of articles.value) {
            console.log(i)
            if (i.id == id) { return i }
        }
    }

    return { articles, loading, getArticle, publicArticles }
})