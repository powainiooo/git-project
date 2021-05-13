import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
// import { ACCESS_TOKEN } from '@/config'
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
  }
]

const router = new VueRouter({
  routes
})
export default router
