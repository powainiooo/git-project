import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'
import { ACCESS_TOKEN } from '@/config'
import { LoadingBar } from 'view-design'
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
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/order/list',
    name: 'Order-list',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/list.vue')
  },
  {
    path: '/order/detail1',
    name: 'Order-detail1',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/detail1.vue')
  },
  {
    path: '/order/detail2',
    name: 'Order-detail2',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/detail2.vue')
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
      next({ name: 'Home' })
      LoadingBar.finish()
    } else {
      if (store.state.hasGlobalData) {
        console.log('3')
        next()
      } else {
        console.log('4')
        store.dispatch('getUserData').then(res => {
          console.log('5')
          if (res.shop && res.shop.address !== null) {
            if (to.name === 'Account') {
              next({ name: 'Home' })
            } else {
              next()
            }
          } else {
            if (to.name === 'Account') {
              next()
            } else {
              next({ name: 'Account' })
            }
            // next({path: '/account'})
          }
        }).catch(err => {
          console.log('err', err)
          // store.dispatch('logout').then(() => {
          //   next({ path: '/login' })
          // })
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
})
router.afterEach(() => {
  LoadingBar.finish()
})
export default router
