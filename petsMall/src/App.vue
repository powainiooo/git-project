<style>
@font-face {
   font-family: 'Helve';
   src: url('http://catbox.pc-online.cc/static/fonts/HelveticaNeue_Medium.ttf') format('woff2');
}
@font-face {
   font-family: 'HelveThin';
   src: url('http://catbox.pc-online.cc/static/fonts/HelveticaNeueThin.ttf') format('woff2');
}
page {
   --mainColor: #DDC9A8;
   --textColor: #3F3221;
   --textColor2: #3E311F;
   --boxShadow: 0 20px 50px -20px rgba(0, 0, 0, 0.2);
   --textShadow: 0 0 5px rgba(0, 0, 0, 0.25);
   --textShadow2: 0 0 5px rgba(0, 0, 0, 0.33);
   --titleHeight: 120
}
.container { padding-top: 180px;}

.blur { filter: blur(2px); -webkit-filter: blur(2px);}

button:after { border: none;}

.btn-round { width: 100%; height: 70px; line-height: 70px; border-radius: 35px; background-color: var(--mainColor); text-shadow: var(--textShadow); border: none; font-size: 20px; color: #ffffff; margin: 0; }
.btn-round:after { border: none;}

.borderB, .borderT, .borderR, .borderL { position: relative;}
.borderT:after { content: ''; width: 100%; height: 2px; background-color: #D1CECE; position: absolute; left: 0; top: 0; transform: scaleY(.5); }
.borderB:after { content: ''; width: 100%; height: 2px; background-color: #D1CECE; position: absolute; left: 0; bottom: 0; transform: scaleY(.5); }
.borderR:before { content: ''; width: 2px; height: 100%; background-color: #D1CECE; position: absolute; right: 0; top: 0; transform: scaleX(.5); }
.borderL:before { content: ''; width: 2px; height: 100%; background-color: #D1CECE; position: absolute; left: 0; top: 0; transform: scaleX(.5); }

.hint-content { margin: 50px 55px; font-size: 30px; color: #9B9A9A; line-height: 45px; }

.hint-result { margin: 120px 66px; }
.hint-result img { margin-bottom: 38px; }
.hint-result h3 { font-size: 60px; color: var(--textColor2); text-shadow: var(--textShadow); line-height: 1; margin-bottom: 30px; }
.hint-result h3.en { font-size: 66px; font-family: HelveThin; }

.tips-content { padding: 0 20px 0 66px; }
.tips-content img { width: 70px; margin-bottom: 10px; }
.tips-content p { font-size: 30px; line-height: 1.8; color: #9e9c9d; }

.modal-hints { height: 100vh; box-sizing: border-box; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; flex-direction: column; overflow-y: auto; transition: top .5s cubic-bezier(.23,.78,.33,.97); }
.modal-hints .frame1 { flex: 1; background-color: rgba(255, 255, 255, .97); display: flex; align-items: center; }
.modal-hints .frame2 { width: 100%; height: 200px; background-color: rgba(232, 230, 228, 0.97); display: flex; align-items: center; }
.modal-hints .frame2 img {  width: 78px; margin-left: 68px; }
.modal-hints .close { width: 56px; height: 56px; position: absolute; top: 68px; right: 66px; }

.goods-details .catalog { padding: 32px 26px 10px 26px;}
.goods-details .catalog h3 { font-size: 22px; color: #A6A5A5; margin-bottom: 10px; }
.goods-details .catalog ul { display: flex; flex-wrap: nowrap; }
.goods-details .catalog ul li { min-width: 110px; height: 70px; line-height: 70px; border-radius: 35px; border: 1px solid var(--mainColor); text-shadow: var(--textShadow); font-size: 20px; color: var(--textColor); padding: 0 10px; display: flex; justify-content: center; align-items: center; margin-right: 22px; margin-bottom: 22px;}
.goods-details .catalog ul li.active { background-color: var(--mainColor); color: #ffffff; }
.goods-details .catalog ul li.diabled { background-color: #E8E6E4; color: #A6A5A5; border-color: #E8E6E4; }

.goods-details .intros { padding: 32px 26px; }
.goods-details .intros h3 { font-size: 30px; color: var(--textColor); text-shadow: var(--textShadow); margin-bottom: 16px; }
.goods-details .intros p { font-size: 22px; color: #A6A5A5; line-height: 32px; margin-bottom: 38px; }

.hscale { transition: all 0.15s ease-out; transform: scale(0.95);}
</style>

<script>
import { promisify } from '@/utils'
import { getAction } from '@/utils/api'
import store from './store'

const login = promisify(mpvue.login)
const getSetting = promisify(mpvue.getSetting)
const getUserInfo = promisify(mpvue.getUserInfo)
export default {
   created () {
      console.log('app created')
      this.getData()
   },
   methods: {
      async getData () {
         const token = mpvue.getStorageSync('PETS_TOKEN')
         if (token !== '' && token !== null && token !== undefined) {
            store.commit('SET_TOKEN', token)
         } else {
            const loginRes = await login()
            console.log('loginRes', loginRes)
            const infoRes = await getAction('get_weixin', {
               code: loginRes.code
            })
            console.log('infoRes', infoRes)
            store.commit('SET_TOKEN', infoRes.data.token)
            store.commit('SET_OPENID', infoRes.data.openid)
         }
         const settings = await getSetting()
         store.commit('SET_SETTING', settings.authSetting)
         console.log('settings', settings)
         if (settings.authSetting['scope.userInfo']) {
            const userInfo = await getUserInfo()
            console.log('userInfo', userInfo)
            store.commit('SET_PERSONINFO', userInfo.userInfo)
         }
      }
   }
}
</script>
