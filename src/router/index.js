import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import AddArticleView from '../views/article/AddArticle.vue'
import UpdateArticle from '../views/article/UpdateArticle.vue'
import Article from '@/views/article/Article.vue'
import ArticleView from '@/views/article/ArticleView.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    if(savedPosition){return savedPosition}
    return { el: "#app" }
  } ,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/articles/add',
      name: 'addArticle',
      component: AddArticleView
    },
    {
      path: '/article/update/:id',
      name: 'updateArticle',
      component: UpdateArticle
    },
    {
      path: '/article/:id',
      component: Article,
      name: 'article'
    },
    // {
    //   path: '/article',
    //   component: ArticleView,
    //   children: [
    //     {
    //       path:'',
    //       name:'articleView',
    //       component: ArticleView
    //     },
    //     {
    //       path: ':id',
    //       name: 'article',
    //       component: Article
    //     }
    //   ]
    // }
  ]
})


// scrollBehavior(to, from, savedPosition) {
//   return { top: 0 }
// },

// export default router
