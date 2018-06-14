import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/views/goods'
import goodsin from '@/views/goodsin'
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
      path: '/goodsin',
      name: 'goodsin',
      component: goodsin
    },
    {
      path: '/users',
      name: 'users',
      component: users
    }
  ]
})
