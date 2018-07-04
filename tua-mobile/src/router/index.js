import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import about from '@/views/about'
import works from '@/views/works'
import workdetail from '@/views/workdetail'

Vue.use(Router)


let router = new Router({
    routes: [
        {
            path: '/',
            redirect:'/index'
        },
        {
            path:'/index',
            name: 'index',
            component: index
        },
        {
            path:'/about',
            name: 'about',
            component: about
        },
        {
            path:'/works',
            name: 'works',
            component: works
        },
        {
            path:'/works/detail/:id',
            name: 'workdetail',
            component: workdetail
        }
    ]
});
export default router
