import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import bind from '@/pages/bind'
import list from '@/pages/list'
import publish from '@/pages/publish'
import store from '@/store'
import Cookies from 'js-cookie'

Vue.use(Router)

let router = new Router({
   routes: [
      {
         path: '/',
         redirect: '/index'
      },
      {
         path: '/index',
         name: 'index',
         component: index
      },
      {
         path: '/bind',
         name: 'bind',
         component: bind
      },
      {
         path: '/list',
         name: 'list',
         component: list
      },
      {
         path: '/publish',
         name: 'publish',
         component: publish
      }
   ]
})
router.beforeEach((to, from, next) => {
   store.commit('doShowGlobalMenuDetail', false)
   if (to.name === 'index') {
      store.commit('doShowGlobalMenu', false)
      next()
   } else {
      if (Cookies.get('xfmid')) {
         if (!store.state.isLogin) {
            store.dispatch('getUserData')
         }
         next()
      } else {
         store.commit('doShowGlobalMenu', false)
         next('/index')
      }
   }
})
export default router
