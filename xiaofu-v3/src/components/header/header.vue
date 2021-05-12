<style scoped>
.c-header { width: 100%; position: fixed; top: 0; left: 0; z-index: 1000; }
.c-header-bar { width: 100%; height: 100px; background-color: #ffffff; display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 10; }
.c-header-bar-shadow { box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .05); }
.c-header .logo { width: 269px; height: 70px; margin-left: 38px; }
.c-header .operates { margin-right: 26px; display: flex; align-items: center; }
.c-header .c-cont-frame { height: 58px; background-color: #EEEEEF; border-radius: 16px; display: flex; align-items: center; }
.c-header .c-skip { width: 38px; height: 38px; margin: 0 12px 0 10px; }
.c-header .label { font-size: 20px; color: #9E9E9F; margin-right: 16px; }
.c-header .dot { width: 24px; height: 29px; margin: 0 12px 0 14px; }
.c-header .btn { width: 57px; height: 57px; margin-left: 12px; background: transparent; }
.c-header .btn img { width: 100%; height: 100%; }
</style>

<template>
<div class="c-header">
  <div class="c-header-bar" :class="{'c-header-bar-shadow': showMenuBtn}" :style="{'background-color': bgColor}">
    <img :src="'/static/images/common/' + logo + '.png'" class="logo" @click="toIndex" />
    <div class="operates" v-if="!onlyLogo">
      <!--   跳过   -->
      <div class="c-cont-frame" v-if="showSkip" @click="stopCount">
        <canvas canvas-id="myCanvas" class="c-skip ignore" width="32" height="32" />
        <span class="label">跳过</span>
      </div>
      <picker @change="cityChange" :range="addrList" range-key="name">
      <div class="c-cont-frame"
           v-if="showCity"
           hover-class="hscale"
           hover-stay-time="10">
        <img src="/static/images/common/dot.png" class="dot" />
        <span class="label">{{cityName}}</span>
      </div>
      </picker>
      <button class="btn" v-if="showMenuBtn" @click="openMenu" hover-class="hscale" hover-stay-time="10"><img src="/static/images/common/menu.png" /></button>
      <button class="btn" v-if="showStarBtn" @click="toStar" hover-class="hscale" hover-stay-time="10"><img src="/static/images/common/star-select.png" style="width: 42rpx; height: 40rpx;" /></button>
      <button class="btn" v-if="showCloseBtn" @click="handleClose" hover-class="hscale" hover-stay-time="10"><img src="/static/images/common/close.png" /></button>
      <button class="btn" open-type="share" v-if="showShareBtn" hover-class="hscale" hover-stay-time="10"><img src="/static/images/common/share.png" /></button>
    </div>
  </div>
  <c-menu :show="showMenus" @close="showMenus = false" />
</div>
</template>

<script type='es6'>
import cMenu from './menu'
import store from '@/store'
export default {
  name: 'app',
  components: {
    cMenu
  },
  props: {
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    logo: {
      type: String,
      default: 'logo'
    },
    onlyLogo: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    addrList () {
      return store.state.configData.citydata || []
    }
  },
  data () {
    return {
      showSkip: false,
      showCity: true,
      showMenuBtn: true,
      showCloseBtn: false,
      showMenus: false,
      showShareBtn: false,
      showStarBtn: false,
      originStatus: '',
      pageStatus: '',
      cityName: '全部',
      cityId: 1,
      time: 3000,
      t: 0
    }
  },
  methods: {
    setStatus (status) {
      console.log('setStatus', status)
      this.pageStatus = status
      switch (status) {
        case '':
          this.showMenuBtn = true
          this.showCity = true
          this.showCloseBtn = false
          this.showMenus = false
          break
        case 'menu':
          this.showMenuBtn = false
          this.showCity = false
          this.showCloseBtn = true
          this.showMenus = true
          break
        case 'search':
          this.showMenuBtn = false
          this.showCloseBtn = true
          break
        case 'calendar':
          this.showMenuBtn = false
          this.showCloseBtn = true
          break
        case 'onlyClose':
          this.showCity = false
          this.showMenuBtn = false
          this.showCloseBtn = true
          break
        case 'onlyShare':
          this.showCity = false
          this.showMenuBtn = false
          this.showShareBtn = true
          break
        case 'ticketDetail':
          this.showCity = false
          this.showMenuBtn = false
          this.showCloseBtn = false
          this.showStarBtn = true
          this.showShareBtn = true
          break
        case 'ticketBuy':
          this.showCity = false
          this.showMenuBtn = false
          this.showStarBtn = true
          this.showShareBtn = false
          this.showCloseBtn = true
          break
        case 'orderDetail':
          this.showCity = false
          this.showMenuBtn = false
          this.showStarBtn = true
          this.showShareBtn = false
          this.showCloseBtn = false
          break
      }
    },
    openMenu () {
      this.setStatus('menu')
    },
    handleClose () {
      this.$emit('close', this.pageStatus)
      if (this.pageStatus !== 'onlyClose') {
        this.setStatus(this.originStatus)
      }
    },
    cityChange (e) {
      const item = this.addrList[e.mp.detail.value]
      console.log('cityChange', item)
      this.cityName = item.name
      this.$emit('cityChange', item.id)
    },
    count () {
      this.showSkip = true
      this.showCity = false
      this.showMenuBtn = false
      this.$nextTick(() => {
        this.drawStep()
      })
    },
    drawStep () {
      const ctx = wx.createCanvasContext('myCanvas')
      console.log('drawPost', ctx)
      const step = 360 / (this.time / 16)
      const per = Math.PI / 180
      let current = 0
      this.t = setInterval(() => {
        current += step
        ctx.scale(0.5, 0.5)
        ctx.beginPath()
        ctx.setLineWidth(3)
        ctx.arc(19, 19, 16, 0, 2 * Math.PI)
        ctx.setStrokeStyle('#ffffff')
        ctx.stroke()
        ctx.beginPath()
        ctx.setLineWidth(3)
        ctx.arc(19, 19, 16, -0.5 * Math.PI, -0.5 * Math.PI + current * per)
        ctx.setStrokeStyle('#5F8AE9')
        ctx.stroke()
        ctx.draw()
        if (current > 360) {
          this.stopCount()
        }
      }, 16)
    },
    stopCount () {
      console.log('over')
      clearInterval(this.t)
      this.$emit('skipDone')
    },
    toIndex () {
      mpvue.reLaunch({
        url: '/pages/index/main'
      })
    },
    toStar () {
      mpvue.navigateTo({
        url: '/pages/leesStar/main'
      })
    }
  }
}
</script>
