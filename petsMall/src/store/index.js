// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
const { imgSrc } = config

Vue.use(Vuex)

const store = new Vuex.Store({
   state: {
      token: '',
      openid: '',
      personalInfo: {},
      settings: {},
      imgSrc,
      showCart: false,
      showGoodsDetail: false,
      showOrderType: false,
      goodsDetail: {},
      formData: {},
      catboxFormData: {
         group_id: '2',
         price_id: 1,
         recom_str: '1-3'
      },
      diyGoodsList: []
   },
   mutations: {
      SET_TOKEN (state, data) {
         state.token = data
         mpvue.setStorage({
            key: 'PETS_TOKEN',
            data
         })
      },
      SET_OPENID (state, data) {
         state.openid = data
      },
      SET_PERSONINFO (state, data) {
         state.personalInfo = data
      },
      SET_SETTING (state, data) {
         state.settings = data
      },
      SET_CARTSTATUS (state, data) {
         state.showCart = data
      },
      SET_GOODSDETAILSTATUS (state, data) {
         state.showGoodsDetail = data
      },
      SET_GOODSDETAIL (state, data) {
         state.goodsDetail = data
      },
      SET_ORDERTYPESTATUS (state, data) {
         state.showOrderType = data
      },
      SET_FORMDATA (state, data) {
         state.formData = data
      },
      SET_CBFORMDATA (state, data) {
         state.catboxFormData = data
      },
      SET_DIYGOODSLIST (state, data) {
         state.diyGoodsList = data
      }
   }
})

export default store
