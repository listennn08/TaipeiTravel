import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      redirect: '/login',
      children: [
        {
          path: '/articles',
          name: 'articles',
          component: () => import('@/views/Articles.vue'),
        },
        {
          path: '/article/:id',
          name: 'article100',
          component: () => import('@/views/Post.vue'),
        },
      ],
    },
    {
      path: '/user/:id',
      component: () => import('@/views/User.vue'),
    },
    {
      path: '*',
      component: () => import('@/views/NotFound.vue'),
    }
  ],
});
