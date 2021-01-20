import Vue from 'vue'
import VueRouter from 'vue-router'

//解决路由报错问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home/Home.vue'),
    children:[
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: () => import('../views/Home/index.vue')
      },
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '考试'
        },
        component: () => import('../views/Home/index.vue')
      },
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '我的'
        },
        component: () => import('../views/Home/index.vue')
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/ErrorPage.vue')
  }
]

const router = new VueRouter({
  routes
})

//全局守卫
router.beforeEach((to, from, next) => {
  next()
})

export default router
