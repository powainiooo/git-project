<script>
import { promisify } from '@/utils'
import { doLogin, postAction } from '@/utils/api'
import store from '@/store'
const getSetting = promisify(mpvue.getSetting)
const getUserInfo = promisify(mpvue.getUserInfo)
export default {
  created () {
    this.getData()
    this.getConfig()
  },
  methods: {
    async getData () {
      const token = mpvue.getStorageSync('XIAOFU_TOKEN')
      console.log('XIAOFU_TOKEN', token)
      store.commit('SET_TOKEN', token)
      const settings = await getSetting()
      console.log('settings', settings)
      store.commit('SET_SETTING', settings.authSetting)
      const userInfo = await getUserInfo()
      if (settings.authSetting['scope.userInfo']) {
        doLogin(userInfo)
      }
    },
    getConfig () {
      postAction('/api/common/init').then(res => {
        console.log('getConfig', res)
        if (res.code === 1) {
          store.commit('SET_CONFIGDATA', res.data)
        }
      })
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
/* this rule will be remove */
* {
  box-sizing: border-box;
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
@font-face {
  font-family: 'HelveB';
  src: url('https://github.com/powainiooo/git-project/blob/master/xiaofu-v3/static/fonts/HelveticaNowDisplay-Bold.ttf?raw=true') format('woff2');
}
@font-face {
  font-family: 'HelveL';
  src: url('https://github.com/powainiooo/git-project/blob/master/xiaofu-v3/static/fonts/HelveticaNowDisplay-Light.ttf?raw=true') format('woff2');
}
@font-face {
  font-family: 'HelveT';
  src: url('https://github.com/powainiooo/git-project/blob/master/xiaofu-v3/static/fonts/HelveticaNeueThin.ttf?raw=true') format('woff2');
}
page {
  background-color: #EEEEEF;
}
button {
  margin: 0;
  padding: 0;
}
button:after {
  border: none;
}
.c-tag { height: 67px; line-height: 67px; display: inline-block; font-size: 24px; color: #ffffff; font-family: HelveB; padding: 0 32px; background: linear-gradient(330deg, #5B85E6 0%, #6D9AF4 100%); border-radius: 34px; }

.btn { height: 57px; display: flex; align-items: center; justify-content: center; background: linear-gradient(349deg, #5B85E6 0%, #6D9AF4 100%); border-radius: 16px; font-size: 20px; color: #ffffff; }

.bBorder {
  position: relative;
}
.bBorder:after {
  content: '';
  width: 100%;
  height: 2px;
  transform: scaleY(.5);
  background-color: #DBDCDC;
  position: absolute;
  left: 0;
  bottom: 0;
}

.hscale { transition: all 0.15s ease-out; transform: scale(0.95);}
</style>
