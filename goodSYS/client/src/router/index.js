import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/views/goods'
import goodsnew from '@/views/goodsnew'
import users from '@/views/users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/goodsnew',
      name: 'goodsnew',
      component: goodsnew
    },
    {
      path: '/users',
      name: 'users',
      component: users
    }
  ]
})
