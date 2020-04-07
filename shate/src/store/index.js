import wepy from '@wepy/core'
import Vuex from '@wepy/x'
wepy.use(Vuex)

export default new Vuex.Store({
   state: {
      imgSrc: 'https://st.vsapp.cn', // 图片地址前缀
      loginKey: '', // 登录密钥
      exemption: '小程序信息免责声明', // 免责声明
      phone: '', // 电话
      personalInfo: null,
      showResult: false
   },
   mutations: {
      SET_LOGIN_KEY (state, data) {
         state.loginKey = data
      },
      SET_EXEMPTION (state, data) {
         state.exemption = data
      },
      SET_PHONE (state, data) {
         state.phone = data
      },
      SET_PERSONINFO (state, data) {
         state.personalInfo = data
      },
      SET_RESULT (state, data) {
         state.showResult = data
      }
   },
   actions: {}
})
