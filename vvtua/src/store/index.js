import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        indexGuide: '',
        indexInfo:{
            cover:'',
            goods_img:[],
            title:'',
            home2_desc:'',
            goods_img3:[],
            home3_desc:'',
            goods_img4:[],
            home4_desc:''
        },
        domainUrl:'',
        aboutData:{
            intro:'',
            idea:''
        },
        contactData:{
            contact:'',
            email:'',
            mobile:'',
            address:'',
            wx_number:'',
            ewm_url:'',
            domain_url:'',
            time_slot:''
        },
        cateList:[],
        isGuide:false,
        audio:{}
    },
    mutations: {
        doPassGuide (state) {
            state.isGuide = false
        },
        setAudio(state,data){
            state.audio = data;
        }
    },
    actions: {
        doGetIndex (context) {
            axios.get('api/ajax_home').then((res)=>{
                let data = res.data;
                context.state.indexGuide = data.guide;
                context.state.indexInfo = data.info;
                context.state.domainUrl = data.domain_url;
            }).catch((error)=>{
                console.log(error);
            })
        },
        doGetAbout (context) {
            axios.get('api/ajax_about').then((res)=>{
                let data = res.data;
                context.state.aboutData = data;
            }).catch((error)=>{
                console.log(error);
            })
        },
        doGetContact (context) {
            axios.get('api/ajax_contacts').then((res)=>{
                let data = res.data;
                context.state.contactData = data;
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
