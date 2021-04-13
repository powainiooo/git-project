import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { ACCESS_TOKEN } from '@/config'
import { LoadingBar } from 'view-design'
import Home from '../views/Home.vue'
LoadingBar.config({
  color: '#ffffff'
})

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../views/publish.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  LoadingBar.start()
  if (Vue.ls.get(ACCESS_TOKEN)) {
    if (to.path === '/login') {
      next('/')
      LoadingBar.finish()
    } else {
      if (store.state.hasGlobalData) {
        next()
      } else {
        store.dispatch('getUserData').then(res => {
          const redirect = decodeURIComponent(from.query.redirect || to.path)
          if (to.path === redirect) {
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          } else {
            // 跳转到目的路由
            next({ path: redirect })
          }
        }).catch(err => {
          console.log('err', err)
          store.dispatch('logout').then(() => {
            next({ path: '/login', query: { redirect: to.fullPath } })
          })
        })
      }
    }
  } else {
    next('/login')
    LoadingBar.finish()
  }
})
router.afterEach(() => {
  LoadingBar.finish()
})
export default router
