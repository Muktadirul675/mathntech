import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase.js';

export const useArticleStore = defineStore('articles', () => {
    const articles = reactive([])
    const loading = ref(true)
    let featuredId = ref(null)
    let featured = ref(null)

    async function getArticles() {
        const { data, error } = await supabase.from('articles').select('*').eq('status', 'public').eq('type', 'article').order('created_at', { ascending: false })
        if (error) { console.log('error ', error) }
        else {
            for (var i of data) {
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

    async function getFeaturedArticle() {
        const { data, error } = await supabase.from('dictionary').select('value').eq('key', 'featured_post')
        let id;
        if (error) { console.log('error ', error) }
        else {
            id = parseInt(data[0].value)
        }
        const { data: articleArr, error: articleErr } = await supabase.from('articles').select('*').eq('id', id)
        let article = articleArr[0]
        featured.value = article
    }

    getFeaturedArticle()

    return { articles, loading, getArticle, featured }
})