import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import aboutus from '@/views/aboutus'
import contacts from '@/views/contacts'
import detail from '@/views/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: aboutus
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: contacts
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    }
  ]
})
