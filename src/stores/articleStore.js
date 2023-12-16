import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase';

export const useArticleStore = defineStore('articles', () => {
    const articles = ref(null)
    const loading = computed(() => {
        return ((articles.value == null))
    })

    async function getArticles() {
        const { articleData, error } = await supabase
            .from('articles')
            .select()
            .then((articleData) => {
                articles.value = articleData.data
                console.log('article store article value ', articles.value)
            })
    }

    getArticles()

    function getArticle(id) {
        for (var i of articles.value) {
            console.log(i)
            if (i.id == id) { return i }
        }
    }

    return { articles, loading, getArticle }
})