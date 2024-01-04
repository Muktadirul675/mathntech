import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useArticleStore } from './articleStore.js';
import { usePostStore } from './postStore.js';
import { useSeriesStore } from './seriesStore.js';

export const useFeedStore = defineStore('feedStore', () => {
  let articleStore = useArticleStore()
  let postStore = usePostStore()
  let seriesStore = useSeriesStore()

  let articles = computed(() => {
    if (articleStore.loading) { return null }
    else {
      if (articleStore.articles.length <= 4) { return articleStore.articles }
      else {
        return articleStore.articles.slice(0, 4)
      }
    }
  })
  let serieses = computed(() => {
    if (seriesStore.isLoading) { return null }
    else {
      if (seriesStore.series.length <= 2) { return seriesStore.series }
      else { return seriesStore.series.slice(0, 2) }
    }
  })
  let posts = computed(() => {
    if (postStore.loading) { return null }
    else {
      if (postStore.articles.length <= 4) { return postStore.articles }
      else {
        return postStore.articles.slice(0, 4)
      }
    }
  })


  return { serieses, articles, posts }
})