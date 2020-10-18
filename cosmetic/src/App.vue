<script>
import config from '@/config'
import store from '@/store'
import { promisify } from '@/utils'
import { doLogin, postAction } from '@/utils/api'
const { tokenKey } = config
const login = promisify(mpvue.login)
const getSetting = promisify(mpvue.getSetting)
const getUserInfo = promisify(mpvue.getUserInfo)
export default {
   created () {
      // 调用API从本地缓存中获取数据
      /*
       * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
       * 微信：mpvue === wx, mpvuePlatform === 'wx'
       * 头条：mpvue === tt, mpvuePlatform === 'tt'
       * 百度：mpvue === swan, mpvuePlatform === 'swan'
       * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
       */
      console.log('app created')
      // let logs
      // if (mpvuePlatform === 'my') {
      //    logs = mpvue.getStorageSync({key: 'logs'}).data || []
      //    logs.unshift(Date.now())
      //    mpvue.setStorageSync({
      //       key: 'logs',
      //       data: logs
      //    })
      // } else {
      //    logs = mpvue.getStorageSync('logs') || []
      //    logs.unshift(Date.now())
      //    mpvue.setStorageSync('logs', logs)
      // }
      mpvue.imgSrc = store.state.imgSrc
      console.log('onlogin1')
      this.onlogin()
      this.getPersonData()
   },
   log () {
      console.log(`log at:${Date.now()}`)
   },
   methods: {
      async onlogin () {
         console.log('onlogin2')
         let lastGetCityTime = mpvue.getStorageSync('lastGetCityTime')
         if (lastGetCityTime === '' || lastGetCityTime === null) {
            lastGetCityTime = 0
         }
         const now = new Date().getTime()
         const loginKey = mpvue.getStorageSync(tokenKey)
         if (loginKey === '' || loginKey === null || now > lastGetCityTime + 24 * 60 * 60 * 1000) {
            const resLogin = await login()
            console.log('resLogin', resLogin)
            const resDoLogin = await doLogin({
               code: resLogin.code
            })
            console.log('resDoLogin', resDoLogin)
            if (resDoLogin.ret === 0) {
               store.commit('SET_LOGIN_KEY', resDoLogin.data.login_key)
               mpvue.setStorageSync('lastGetCityTime', now)
            }
         } else {
            store.commit('SET_LOGIN_KEY', loginKey)
         }
         const resSetting = await getSetting()
         console.log('resSetting', resSetting)
         if (resSetting.authSetting['scope.userInfo']) {
            const resUserInfo = await getUserInfo()
            console.log('resUserInfo', resUserInfo)
            store.commit('SET_PERSONINFO', resUserInfo.userInfo)
         }
      },
      getPersonData () {
         postAction('get_preson_info').then(res => {
            if (res.ret === 0) {
               // store.commit('SET_SAVEINFO', !Array.isArray(res.data.user_info))
               store.commit('SET_PERSONINFO', res.data.user_info)
            }
         })
      }
   }
}
</script>

<style>
.img_block { width: 100%; display: block;}

.btn-round { width: 100%; height: 70px; border-radius: 50px; background-color: #3a3a3a; display: flex; justify-content: center; align-items: center; font-size: 26px; color: #ffffff;}

.goods-list { margin: 30px; display: flex; flex-wrap: wrap;}
.goods-list .c-goods-item { margin-bottom: 35px;}
.goods-list .c-goods-item:nth-child(2n) { margin-left: 30px;}

.load-over { font-size: 20px; color: #666666; text-align: center; margin: 30px 0 40px 0;}

.link-arrow:after { content: ''; width: 14px; height: 24px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAMAAAD9GTxlAAAAbFBMVEUAAAB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHhrgHjoAAAAI3RSTlMA3Zr34wrNhl8vJhYQBAHz7dW+saSReGxmSDkeGtLDt1hQK4Rh8QoAAACESURBVBjTVc9HFoQgEEVREAwIZm1D537732OPkLJm91T4p9RvzZWogqEWLKH7ClcGlibZaRh9cniDPZLbG5hNHNh7mEVi/YTinpzPYB9iYYVMUGXYK7VMk8NhAu3PoAFe5+FPB1n8oynBVLHlR9Au6rAwhajNQNlGLdDvKV1fHlGuyoX+EpQJ3YRJEnIAAAAASUVORK5CYII=) no-repeat; background-size: 100%; position: absolute; top: 50%; right: 26px; transform: translateY(-50%);}
</style>
