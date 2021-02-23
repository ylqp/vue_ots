import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeLayout from '../views/Home/components/homeLayout.vue'

//解决路由报错问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: HomeLayout,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children:[
      {
        path: '',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: () => import('../views/Home/index.vue')
      },
      {
        path: '/examList',
        name: 'examList',
        meta: {
          title: '考试列表'
        },
        component: () => import('../views/Home/examList.vue')
      },
      {
        path: '/payList',
        name: 'payList',
        meta: {
          title: '付费列表'
        },
        component: () => import('../views/Home/payList.vue')
      },
    ]
  },
  {
    path: '/exam',
    name: 'exam',
    meta: {
      title: '考试'
    }
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
