import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/search',
    component: () => import('../views/search/search.vue')
  },
  {
    path: '/article/:articleId',
    component: () => import('../views/article/article.vue')
  },
  {
    path: '/layout',
    component: () => import('../views/layout/layout.vue'),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/home/home.vue')
      },
      {
        path: 'qa',
        component: () => import('../views/qa/qa.vue')
      },
      {
        path: 'video',
        component: () => import('../views/video/video.vue')
      },
      {
        path: 'my',
        component: () => import('../views/my/my.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }

  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // 路由使用懒加载的形式来导入组件，这样只有在用到他的时候才会加载，大大加快页面更新效率
  // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
