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
    redirect: '/index'
  },
  {
    path: '/index',
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
  console.log('to', to)
  if (Vue.ls.get(ACCESS_TOKEN)) {
    console.log('1')
    if (to.path === '/login') {
      console.log('2')
      next('/index')
      LoadingBar.finish()
    } else {
      if (store.state.hasGlobalData) {
        console.log('3')
        next()
      } else {
        console.log('4')
        store.dispatch('getUserData').then(res => {
          console.log('5')
          next()
        }).catch(err => {
          console.log('err', err)
          store.dispatch('logout').then(() => {
            next({ path: '/login' })
          })
        })
      }
    }
  } else {
    console.log('8')
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
    LoadingBar.finish()
  }
  store.commit('SET_MENU', false)
})
router.afterEach(() => {
  LoadingBar.finish()
})
export default router
