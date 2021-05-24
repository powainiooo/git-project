import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { ACCESS_TOKEN } from '@/config'
import { LoadingBar } from 'view-design'
import Home from '../views/home/Home.vue'
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
    component: Home,
    redirect: '/index/datas',
    children: [
      { path: 'datas', name: 'Datas', component: () => import('../views/home/datas.vue') },
      { path: 'goods', name: 'Goods', component: () => import('../views/home/goods.vue') },
      { path: 'peripheral', name: 'Peripheral', component: () => import('../views/home/peripheral.vue') },
      { path: 'orders', name: 'Orders', component: () => import('../views/home/orders.vue') },
      { path: 'profit', name: 'Profit', component: () => import('../views/home/profit.vue') }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/account.vue')
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
})
router.afterEach(() => {
  LoadingBar.finish()
})
export default router
