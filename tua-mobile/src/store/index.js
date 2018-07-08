import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cateList:[
            {
                id:0,
                cname:'音樂',
                code:'MUSIC',
                child:[
                    {
                        id:1,
                        cname:'海報'
                    }
                ]
            }
        ],
        cateID:[0,0],
        isGuide:true,
        audio:{},
        aboutData:{},
        indexData:{},
        navActiveIndex:-4,
        showMenu:false
    },
    mutations: {
        doPassGuide (state) {
            state.isGuide = false
        },
        setAudio(state,data){
            state.audio = data;
        },
        setCateID(state,data){
            state.cateID = data;
        },
        setNavActiveIndex(state,data){
            state.navActiveIndex = data;
        },
        setShowMenu(state,data){
            state.showMenu = data;
        }
    },
    actions: {
        doGetAbout (context) {
            axios.get('api/ajax_about').then((res)=>{
                let data = res.data;
                context.state.aboutData = data;
            }).catch((error)=>{
                console.log(error);
            })
        },
        doGetCate (context) {
            axios.get('admin/api_v2/cate_list').then((res)=>{
                let data = res.data;
                context.state.cateList = data;
            }).catch((error)=>{
                console.log(error);
            })
        },
        doGetIndex (context) {
            axios.get('admin/api_v2/ajax_home').then((res)=>{
                let data = res.data;
                context.state.indexData = data;
            }).catch((error)=>{
                console.log(error);
            })
        },
        doGetAbout (context) {
            axios.get('admin/api_v2/ajax_about').then((res)=>{
                let data = res.data;
                context.state.aboutData = data;
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
});
export default store
