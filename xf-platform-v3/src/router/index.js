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

export default router
