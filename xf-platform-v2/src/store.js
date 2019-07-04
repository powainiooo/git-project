import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'
Vue.use(Vuex)

const store = new Vuex.Store({
   state: {
      showGlobalMenu: Cookies.get('mid'),
      showGlobalMenuDetail: false,
      isLogin: false,
      userData: {},
      bankData: {},
      contactData: {},
      fileurl: '',
      startDate: '',
      endDate: '',
      editorData: { id: -1 },
      errorData: {
         goods_id: -1,
         address: '',
         cover: '',
         cover2: '',
         goods_name: '',
         goods_desc: [],
         notify: [],
         person_desc: []
      },
      bankList: [
         { label: '招商银行', value: '1001' },
         { label: '工商银行', value: '1002' },
         { label: '建设银行', value: '1003' },
         { label: '浦发银行', value: '1004' },
         { label: '农业银行', value: '1005' },
         { label: '民生银行', value: '1006' },
         { label: '兴业银行', value: '1009' },
         { label: '平安银行', value: '1010' },
         { label: '交通银行', value: '1020' },
         { label: '中信银行', value: '1021' },
         { label: '光大银行', value: '1022' },
         { label: '华夏银行', value: '1025' },
         { label: '中国银行', value: '1026' },
         { label: '广发银行', value: '1027' },
         { label: '北京银行', value: '1032' },
         { label: '宁波银行', value: '1056' },
         { label: '邮储银行', value: '1066' }
      ]
   },
   mutations: {
      doLogin (state) {
         state.isLogin = true
      },
      doShowGlobalMenu (state, data) {
         state.showGlobalMenu = data
      },
      doShowGlobalMenuDetail (state, data) {
         state.showGlobalMenuDetail = data
      },
      setStartDate (state, data) {
         state.startDate = data
      },
      setEditorData (state, data = { id: -1 }) {
         state.editorData = data
      },
      setErrorData (state, data) {
         if (data) {
            state.errorData = data
         } else {
            state.errorData = {
               goods_id: -1,
               address: '',
               cover: '',
               cover2: '',
               goods_name: '',
               goods_desc: [],
               notify: [],
               person_desc: []
            }
         }
      },
      setEndDate (state, data) {
         state.endDate = data
      },
      setGlobalData (state, data) {
         state.userData = data.data
         state.bankData = data.bank
         state.contactData = data.contact
         state.fileurl = data.fileurl
      }
   },
   actions: {
      getUserData (context, isLogin) {
         axios.defaults.headers.common['mid'] = Cookies.get('xfmid')
         axios.defaults.headers.common['tokey'] = Cookies.get('xftokey')
         // axios.defaults.baseURL = 'http://wechat.leesticket.com';
         axios.get('/client/api/get_info').then(res => {
            let data = res.data
            if (data.status === 1) {
               context.commit('doLogin')
               context.commit('setGlobalData', data)
               if (isLogin) {
                  if (data.bank.id) {
                     router.push('list')
                  } else {
                     router.push('bind')
                  }
               }
            }
         })
      }
   }
})
export default store
