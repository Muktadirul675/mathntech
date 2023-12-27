import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import AddArticleView from '../views/article/AddArticle.vue'
import UpdateArticle from '../views/article/UpdateArticle.vue'
import Article from '@/views/article/Article.vue'
import AddSeries from '@/views/series/AddSeries.vue'
import SeriesBlog from '@/views/series/SeriesBlog.vue'
import SeriesView from '@/views/series/SeriesView.vue';
import PostBlog from '@/views/post/PostBlog.vue';
import Post from '@/views/post/Post.vue';
import UpdatePost from '@/views/post/UpdatePost.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/blog/serieses',
      name: 'seriesBlog',
      component: SeriesBlog,
    },
    {
      path: '/articles/add',
      name: 'addArticle',
      component: AddArticleView,
      meta: {
        admin: true
      },
    },
    {
      path: '/article/update/:id',
      name: 'updateArticle',
      component: UpdateArticle,
      meta: {
        admin: true
      },
    },
    {
      path: '/article/:id',
      component: Article,
      name: 'article'
    },
    {
      path: '/series/add',
      name: 'addSeries',
      component: AddSeries,
      meta: {
        admin: true
      },
    },
    {
      path: '/series/:id',
      name: 'series',
      component: SeriesView,
    },
    {
      path:'/blog/posts',
      name:'postBlog',
      component: PostBlog,
    },
    {
      path: '/post/:id',
      name:'post',
      component: Post,
    },
    {
      path:'/post/update/:id',
      name:'updatePost',
      component: UpdatePost,
    }
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
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    if (savedPosition) { return savedPosition }
    return { el: "#app" }
  },
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.admin && (to.name == 'addArticle' || to.name == 'updateArticle' || to.name == 'addSeries')) {
//     const user = supabase.auth.getUser()
//     if (user) {
//       if (user.user_metadata.email == 'muktadirul.05@gmail.com') { next() }
//       else { next('/') }
//     } else { next('/') }
//   } else { next() }
// });


// scrollBehavior(to, from, savedPosition) {
//   return { top: 0 }
// },

// export default router
