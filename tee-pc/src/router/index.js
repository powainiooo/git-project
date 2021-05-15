import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
// import { ACCESS_TOKEN } from '@/config'
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
export default router
