import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import AddArticleView from '../views/article/AddArticle.vue'
import UpdateArticle from '../views/article/UpdateArticle.vue'
import Article from '@/views/article/Article.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path:'/articles/add',
      name: 'addArticle',
      component: AddArticleView
    },
    {
      path: '/article/update/:id',
      name: 'updateArticle',
      component: UpdateArticle
    },
    {
      path:'/article/:id',
      name: 'article',
      component: Article
    }
  ]
})

export default router
