import wepy from '@wepy/core'
import Vuex from '@wepy/x'
wepy.use(Vuex)

export default new Vuex.Store({
   state: {
      imgSrc: 'https://st.vsapp.cn', // 图片地址前缀
      loginKey: '', // 登录密钥
      exemption: '', // 免责声明
      phone: '' // 电话
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
      }
   },
   actions: {}
})
