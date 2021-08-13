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
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../views/result.vue')
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
      console.log('2', to, from, store.state)
      // try {
      //   const type = store.state.globalData.merchant.account_type
      //   console.log('type === 0', type === 0)
      //   if (type === 0) { // 老账户
      //     next({
      //       name: 'Account'
      //     })
      //   } else {
      //     next('/index')
      //   }
      // } catch (e) {
      //   next('/index')
      // }
      next('/index')
      LoadingBar.finish()
    } else {
      if (store.state.hasGlobalData) {
        console.log('3')
        const type = store.state.globalData.merchant.account_type
        const status = store.state.globalData.merchant.status
        if (type === 0) {
          if (to.name === 'Account') {
            next()
          } else {
            next('/account')
          }
        } else {
          if (status === 1 || to.name === 'Account') {
            next()
          } else {
            next('/account')
          }
        }
      } else {
        console.log('4')
        store.dispatch('getUserData').then(res => {
          console.log('5', res)
          if (res.merchant.account_type === 0) { // 老账户
            next({
              name: 'Account'
            })
          } else {
            if (res.merchant.status === 1) {
              next()
            } else {
              next({
                name: 'Result'
              })
            }
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
  store.commit('SET_MENU', false)
})
router.afterEach(() => {
  LoadingBar.finish()
})
export default router
