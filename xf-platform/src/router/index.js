import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import bind from '@/pages/bind'
import list from '@/pages/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/list'
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
    }
  ]
})
