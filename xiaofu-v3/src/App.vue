<script>
import { getTokenData, postAction } from '@/utils/api'
import store from '@/store'
export default {
  created () {
    this.getData()
    this.getConfig()
    this.loadFont()
  },
  methods: {
    async getData () {
      const token = mpvue.getStorageSync('XIAOFU_TOKEN')
      console.log('XIAOFU_TOKEN', token)
      store.commit('SET_TOKEN', token)
      getTokenData()
    },
    getConfig () {
      postAction('/api/common/init').then(res => {
        console.log('getConfig', res)
        if (res.code === 1) {
          store.commit('SET_CONFIGDATA', res.data)
        }
      })
    },
    loadFont () {
      const baseUrl = 'https://leesticket.waiting8.com/assets/fonts/'
      mpvue.loadFontFace({
        global: true,
        family: 'HelveB',
        source: `url("${baseUrl}HelveticaNowDisplay-Bold.ttf")`,
        success: (res) => {
          console.log('Helve load over', res)
        }
      })
      mpvue.loadFontFace({
        global: true,
        family: 'HelveL',
        source: `url("${baseUrl}HelveticaNowDisplay-Light.ttf")`,
        success: (res) => {
          console.log('Helve load over', res)
        }
      })
      mpvue.loadFontFace({
        global: true,
        family: 'HelveT',
        source: `url("${baseUrl}HelveticaNeueThin.ttf")`,
        success: (res) => {
          console.log('HelveThin load over', res)
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

.hscale { transition: all 0.15s ease-out; transform: scale(0.95); }

.empty-hint { margin-left: 50px; }
.empty-hint p { font-size: 48px; line-height: 58px; margin-bottom: 10px; font-family: HelveB; }
.empty-hint div { font-size: 48px; line-height: 58px; }

@keyframes slideUp {
  0% { transform: translateY(100px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes slideUp2 {
  0% { transform: translateY(50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
