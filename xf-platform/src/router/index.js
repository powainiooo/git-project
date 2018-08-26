import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import bind from '@/pages/bind'
import list from '@/pages/list'
import publish from '@/pages/publish'
import store from '@/store'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
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
});
router.beforeEach((to,from,next)=>{
    console.log(to)
    if(to.name == 'index'){
        next();
    }else{
        if(store.state.isLogin){
            next();
        }else{
            next('/index')
        }
    }
});
export default router
