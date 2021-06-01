import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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

export default router
