import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cateList:[
            {
                id:0,
                name:'音樂',
                nameEn:'MUSIC',
                list:[
                    {
                        id:1,
                        name:'海報'
                    },
                    {
                        id:2,
                        name:'HD'
                    }
                ]
            },
            {
                id:3,
                name:'平面',
                nameEn:'GRAPHIC',
                list:[]
            },
            {
                id:4,
                name:'繪畫',
                nameEn:'PAINTING',
                list:[]
            },
            {
                id:5,
                name:'影視',
                nameEn:'VIDEO',
                list:[]
            }
        ],
        cateID:0,
        isGuide:true,
        audio:{},
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
            axios.get('api/cate_list').then((res)=>{
                let data = res.data;
                context.state.cateList = data;
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
});
export default store
