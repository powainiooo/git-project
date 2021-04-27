<script>
import config from '@/config'
import store from '@/store'
import { promisify } from '@/utils'
import { doLogin } from '@/utils/api'
const { tokenKey } = config
const login = promisify(mpvue.login)
const getSetting = promisify(mpvue.getSetting)
export default {
  created () {
    mpvue.imgSrc = store.state.imgSrc
    mpvue.toPage = function (url) {
      mpvue.navigateTo({
        url
      })
    }
    this.onlogin()
  },
  methods: {
    async onlogin () {
      let lastGetCityTime = mpvue.getStorageSync('lastGetCityTime')
      if (lastGetCityTime === '' || lastGetCityTime === null) {
        lastGetCityTime = 0
      }
      const now = new Date().getTime()
      const loginKey = mpvue.getStorageSync(tokenKey)
      console.log('loginKey', loginKey)
      if (loginKey === '' || loginKey === null || now > lastGetCityTime + 24 * 60 * 60 * 1000) {
        const resLogin = await login()
        console.log('resLogin', resLogin)
        const resDoLogin = await doLogin({
          code: resLogin.code
        })
        console.log('resDoLogin', resDoLogin)
        if (resDoLogin.ret === 0) {
          store.commit('SET_LOGIN_KEY', resDoLogin.data)
          mpvue.setStorageSync('lastGetCityTime', now)
          if (typeof this.$mp.app.loginCallback === 'function') {
            this.$mp.app.loginCallback()
          }
        }
      } else {
        store.commit('SET_LOGIN_KEY', loginKey)
      }
      const resSetting = await getSetting()
      console.log('resSetting', resSetting)
      store.commit('SET_SETTING', resSetting.authSetting)
    }
  }
}
</script>

<style>
@import "../static/css/reset.css";
/*
  common
*/
.container { padding-bottom: 100px; min-height: 100vh; }
.container2 { min-height: 100vh; background-color: #F8F8F8; }
.container3 { min-height: 100vh; background-color: #F8F8F8; padding-bottom: 100px; }
.mh100 { min-height: 100vh; }

.c-39 { color: #393A3C; }
.c-99 { color: #999999; }
.c-3d { color: #3D7FC7; }
.c-link { color: #446CB2; }

.b-f8 { background-color: #F8F8F8; }
.b-fff { background-color: #FFFFFF; }

.hr10 { height: 10px; background-color: #F2F2F2; }
.hr20 { height: 20px; background-color: #F8F8F8; }

.radio { min-height: 26px; display: inline-block; background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZCNEVCOEQzOUU4QTExRUJBMjgzOEFBRjg0QjhERTIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZCNEVCOEQ0OUU4QTExRUJBMjgzOEFBRjg0QjhERTIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkI0RUI4RDE5RThBMTFFQkEyODM4QUFGODRCOERFMjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkI0RUI4RDI5RThBMTFFQkEyODM4QUFGODRCOERFMjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7teJhDAAAB30lEQVR42ryWvUsCYRzHz8swnHyZXb1qcQjaynKowaFwCfoDcotsLZEoGqXa7A8QGopahBpEcQscXMprdfZlkiSLvr/4Cpfo5ctdP/iAnD7fj89zz5uj0Wgof1QQbIMNsAj8fF4HL+AJ3Hu93jezEIeJKAxOwSwogGcG1/h9gOJlsAY+QBLC4qiiOXABFkAW3IDWsH+DYKXZbHrwcQfsgldwgOfvxt+pfe18IA8+wR7ImEkMshbIsI20zUPuGyZygxyH6RDoypgFmc62kpGDzD1IdAnK4AR0lAkLsg4zysz8JQpzdl1NI+mTSVYQvQobRWd88bpiUXEYs8z+EYWAk7PL6pJMJ3oVElGML69ltUVmI7NjIlrhYrSrJHtVRPNc8XaVZGsq966ajSLJ9qvKP5XKXThgo0Oy6yKqche2qyRbF1GJW71dJdklEd3xPPFYbeDxIdm3IqqALs8Tq0syu1i4ld6sO+ahpVnYG42ZSeOmWuSk2AcuCyQuZlXRm0L/eZQASyA1jYySFLMSgw6+NoiCCEhPMowcrjQzouhNe9idQRbvOpgB1yA+ymyU2QXibCNtI5DUx7lunfPPjHLd+gJHvXcyzr2uV7K7b4FNXsGMF0i5Wj2CBwiqZiHfAgwAbQeVJBGjerIAAAAASUVORK5CYII=") no-repeat; background-size: 26px 26px; background-position: 0 center; padding-left: 36px; font-size: 26px; color: #626262; }
.radio-active { background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAD1UlEQVRIS71Wa0yTVxh+TimXfmqCtEPAqOgPFEYySthQItKLFwIWDGTGH5uXjLEIdMH9MqDblMH8YYIRlIgYyfbHmEi0nzIvFIosKGoKP1hxLnM4Iy3SIgmj5VJ7lvOFfrVawAvh/Gpz3vM+53uf9zzPSzDH0hZfiwPx7KAEWwlFAgD59BEHJbAQipugksvGU9mPZktFZtrcojdkeCipiFwqS9ekxCApToFVUUsQvjgE7pce2EfGMTjsQs9fdpjMVtgczg4JoYdv1eS0B8r5BpBqb1tY0KKxE5ERYYUFueuIShkDiWTG+wg5PR4KU/cAGq48pM+Hx+tfji0qNTWqx18F9Muw7cD1CPfU1NX1ics2lO1RgguTzlVZv33nhBtVjd242zt4RxocvP1GdeawN0AE0hXynCuEtu7IWJNalJ8AQmb/ipluQCnF6UsWXG5/3CWbJBq+XudksWI2rZ4/q1LGFJTvTcbrGE9so2jufIp7lueMCwEjWsHh0/hIZKWtELh7dVEKVDaaWTkbjDW6r0UgRrw8nGs7V55BuFBfuRjpdU0WGDqegN00IMmEIDttJfbnJyA0OEgMYWUsqGyn9hGnmjWI8EVaPd9Rtlu5UZOyXAxkIGV192D+0/5WPCnjFPi56DNIgyRifOuDZ6j6pft3Y40unaj1/CfRS2U9v/6g8euukxd7YejofysQb1DupljoP08Uz7Bu/PJIK6wvXElEq796ZNfmNd8X5MSLAf3WURQeuy207bss9gzqD25CbLSPswZDHy60PD5KtMV867HiVHVK/EdizrqmP3Cp7Z93wRBj89WrsT/vY/H/g74hHDzdZSLaEn7gQsXmaEV4mLi57ycTng7+915AK5YtxvlDKvEsU5Bdh1usDGjit+qskGCpj8TM0mZBZt5nsWa4fiLLr6kyS5sn5x1IFioFfzwzINC8lo41QkNZRoDSzXMz5KlWoyg/UDMsRHvf+rtiXh9sTnosvt3pe7BMtr74cfrBLpgEMSAmqoppUWVd410fIqquCTe+qmynQy9cmpZanclnEyWGM6rk5YWBbIJJUnPnv7hvGYLVMSYIZ5ScQ/JaBbLSVvpJDrukaBPmZ/XG2pxvRJtgPxbM+ASuipvkhEivpSZGpX6IlXf12roodWcbT+U5vDS84dcbDlyUcZNctXc4USfHzGnrrw8n3BT9zmvhMwJ5N4Rxy0OqIiNkacwQk+LkiGXj1pJQIWRkdAL9tlH0PHLAZB6Aze7sJATljPhAGjnnBLK1hF/npiSXgG4DATMtcYAERR8FuSEl9MrNWt3D2UT4fwv/9Jvp5ldOAAAAAElFTkSuQmCC") }

button { padding: 0; }
button:after { border: none;}

.borderT { position: relative; }
.borderT:before { content: ''; width: 100%; height: 2px; background-color: #E5E5E5; transform: scaleY(.5); position: absolute; top: 0; left: 0; }
.borderB { position: relative; }
.borderB:after { content: ''; width: 100%; height: 2px; background-color: #E5E5E5; transform: scaleY(.5); position: absolute; bottom: 0; left: 0; }

.btn { width: 100%; height: 86px; line-height: 86px; border-radius: 4px; background-color: #436CB3; font-size: 36px; color: #FFFFFF; }
.btn-min { height: 65px; line-height: 65px; font-size: 30px; font-weight: normal; }
.btn-light { background-color: #83ABEF; }

.cover { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, .7); z-index: 500; }

.float-box { width: 100%; height: 60vh; overflow-y: auto; background-color: #FFFFFF; border-radius: 50px 50px 0 0; position: fixed; left: 0; bottom: -60vh; padding: 70px 30px; z-index: 1100; transition: bottom .4s cubic-bezier(.22,.61,.3,.99); }
.float-box-show { bottom: 0; }
.float-box h3 { color: #3D7FC7; font-size: 34px; margin-bottom: 60px; }
.float-box li { margin-bottom: 20px; font-size: 22px; line-height: 40px; display: flex; }
.float-box li div { width: 180px; }
.float-box li p { width: 540px; }
.float-box .btn { width: 340px; }

.box-bg { border-radius: 10px; background-color: #F7F7F7; }

.tool-list { margin-left: 15px; margin-right: 15px; display: flex; flex-wrap: wrap; }
.tool-list .tool-item { margin: 0 30px 70px 30px;}
.tool-item { width: 120px; height: 130px; display: flex; justify-content: space-between; align-items: center; flex-direction: column; }
.tool-item img { width: 64px; height: 58px; }
.tool-item div { text-align: center; }

.form { background-color: #FFFFFF; position: relative; }
.form:before { content: ''; width: 100%; height: 2px; background-color: #E5E5E5; transform: scaleY(.5); position: absolute; top: 0; left: 0; }
.form .formLine { width: 100%; height: 100px; display: flex; align-items: center; position: relative; }
.form .formLine:after { content: ''; width: 100%; height: 2px; background-color: #E5E5E5; transform: scaleY(.5); position: absolute; bottom: 0; left: 0; }
.form .formLine .formLabel { width: 260px; padding-left: 42px; font-size: 32px; }
.form .formLine .formContent { width: 490px; height: 100%; display: flex; align-items: center; }
.form .formLine .formContent input { height: 100%; border: none; font-size: 32px; }

.tabs1 { width: 690px; height: 78px; position: relative; display: flex; margin-left: auto; margin-right: auto; }
.tabs1:after { content: ''; width: 200%; height: 200%; border: 2px solid #E5E5E5; transform: scale(.5); transform-origin: 0 0; position: absolute; top: 0; left: 0; }
.tabs1 li { height: 100%; flex: 1; font-size: 30px; display: flex; justify-content: center; align-items: center; position: relative; z-index: 10; }
.tabs1 li:after { content: ''; width: 2px; height: 100%; background-color: #E5E5E5; position: absolute; top: 0; right: 0; transform: scaleX(.5) }
.tabs1 li:last-child:after { width: 0; }
.tabs1 li.active:before { content: ''; width: 138px; height: 6px; background-color: #436CB3; position: absolute; bottom: 0; left: 50%; margin-left: -74px; }

.tabs2 { width: 690px; display: flex; padding-left: 18px; margin-left: auto; margin-right: auto; }
.tabs2 li { width: 100px; padding-bottom: 20px; font-size: 30px; text-align: center; }
.tabs2 li.active { border-bottom: 6px solid #436CB3; }

.tabs3 { display: flex; justify-content: space-around; }
.tabs3 li { font-size: 26px; color: #999999; padding-bottom: 14px; position: relative; }
.tabs3 li.active { font-size: 30px; color: #333333; }
.tabs3 li.active:after { content: ''; width: 38px; height: 4px; background-color: #3366CC; position: absolute; bottom: 0; left: 50%; margin-left: -19px; }

.c-tag { font-size: 18px; color: #FFFFFF; border-radius: 4px; height: 34px; line-height: 30px; margin-bottom: 15px; display: inline-block; padding: 0 10px; }

.blue-box { border: 12px solid #436CB3; border-bottom: none; overflow: hidden; }
.blue-box h3 { font-size: 36px; color: #FFFFFF; background-color: #436CB3; text-align: center; padding: 20px 0; }
.blue-box h4 { font-size: 36px; color: #436CB3; margin: 40px 0; }
.blue-box h5 { font-size: 28px; color: #436CB3; margin: 20px 0; }
.blue-box div { margin: 40px 36px; }
.blue-box div p { font-size: 18px; color: #666666; line-height: 35px; }

.to-next { height: 90px; padding: 0 32px; display: flex; align-items: center; justify-content: flex-end; font-size: 22px; background-color: #FFFFFF }

.empty { text-align: center; margin-top: 100px; font-size: 32px; }

.consult-frame { margin: 30px; }
.consult-frame .blue-frame { background: linear-gradient(45deg, #3366CC, #3DB6FF); border-radius: 3px; color: #FFFFFF; padding: 26px 20px; font-size: 24px; line-height: 40px; }
.consult-frame .title1 { font-size: 24px; color: #3366CC; margin-left: 40px; margin-bottom: 20px; }
.consult-table { background-color: #F9F9F9; padding: 20px 15px; }
.consult-table ul { display: flex; margin-bottom: 20px; }
.consult-table ul li { flex: 1; font-size: 22px; color: #666666; }
.consult-table ul.thead li { flex: 1; font-size: 22px; color: #333333; text-align: center; }
.consult-table ul.thead li:first-child { text-align: left; }
.consult-table ul.tr li { text-align: center }
.consult-table ul.tr li:first-child { text-align: left }
.consult-frame .hint1 { font-size: 18px; color: #3366CC; margin-left: 40px; margin-top: 25px; }
</style>
