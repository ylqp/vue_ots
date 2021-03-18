import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeLayout from '../views/Home/components/homeLayout.vue'
import store from '@/store'

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
    name: 'login',
    component: Login
  },
  {
    path: '/index',
    component: HomeLayout,
    meta: { 
      requiresAuth: true
    },
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
        path: '/examList/:id/:takePhotoInTest',
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
    path: '/exam/:id',
    name: 'exam',
    meta: {
      title: '考试'
    },
    component: () => import('../views/Exam/index.vue')
  },
  { 
    path: '/test/editor',
    name: 'editor',
    component: () => import('../components/editor.vue')
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
  // console.log(store)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user.userFPSettings) {
      next({
        name: 'login',
        query: { // 通过 URL 传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next() //允许通过
    }
  } else {
    next() //允许通过
  }
  next()
})

export default router
