<style>
.index-page { height: 100vh; overflow: hidden; position: relative; }
.index-swiper { width: 100%; height: calc(100vh - 104px - 272px); }
.swiper-sec { height: 100%; }
.index-page .line1 { width: 100%; position: absolute; top: 0; left: 0; padding: 22px 25px 0 32px; z-index: 100; }
.index-page .line1 .l img { width: 80px; }
.index-page .line1 .l p { font-size: 100px; font-family: DinB; color: #41372D; line-height: 118px; }
.swiper-sec .icons { width: 100%; height: 100%; padding-top: 176px; display: flex; justify-content: center; align-items: center; }
.swiper-sec .icons .pig { height: 63%; display: block; position: relative; }
.swiper-sec .icons .pig .img { height: 100%; }
.swiper-sec .icons .coupon { height: 41%; display: block; }
.swiper-sec .icons .coupon .img { height: 100%; }
.swiper-sec .icons .gift { height: 53%; display: block; }
.swiper-sec .icons .gift .img { height: 100%; }

.points-list { padding: 20px 34px; min-height: calc(100vh - 860px); }
.points-list li { height: 120px; padding: 0 24px; }
.points-list .empty-hint { margin: 50px 0 0 50px; }

.icon-move { animation: iconmove 1s linear both; }
@keyframes iconmove {
  0%, 100% { transform: rotateZ(0deg) scale(1); }
  10% { transform: rotateZ(0deg) scale(.9); }
  20%, 60% { transform: rotateZ(10deg) scale(1.1); }
  40%, 80% { transform: rotateZ(-10deg) scale(1.1); }
}
</style>

<template>
  <div class="page index-page">
    <c-header menus />
    <bubble />
    <div class="container pr">
      <div class="line1 between">
        <div class="l">
          <img src="/static/images/index/tag1.png" mode="widthFix" v-if="current === 0" />
          <img src="/static/images/index/tag2.png" mode="widthFix" v-else-if="current === 1" />
          <img src="/static/images/index/tag3.png" mode="widthFix" v-else-if="current === 2" />
          <p>{{nums}}</p>
        </div>
        <div class="r acenter">
          <button class="btn-circle mr15"
                  hover-class="hscale"
                  hover-stay-time="10"
                  @click="openScan"><img src="/static/images/index/scan.png" mode="widthFix" class="w26" /></button>
          <button class="btn"
                  hover-class="hscale"
                  hover-stay-time="10"
                  v-if="showRecordBtn"
                  @click="toRecord">使用记录</button>
        </div>
      </div>
      <swiper class="index-swiper"
              :current="current"
              indicator-dots
              indicator-color="#EADED0"
              indicator-active-color="#41372D"
              duration="300"
              @change="change">
        <swiper-item>
          <coins ref="score" :nums="score" />
        </swiper-item>
        <swiper-item>
          <coupons ref="coupon" :nums="coupon" />
        </swiper-item>
        <swiper-item>
          <gifts ref="gift" :nums="prize" />
        </swiper-item>
      </swiper>

      <goods ref="goods" />
    </div>
    <c-footer />
    <!-- 积分记录  -->
    <records ref="records" @load="recordLoad" />
  </div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import bubble from './modules/bubble'
import coins from './modules/coins'
import coupons from './modules/coupons'
import gifts from './modules/gifts'
import goods from './modules/goods'
import records from '../personal/points/modules/records'
import store from '@/store'
import { TweenMax } from 'gsap'
import { getAction } from '@/utils/api'

export default {
  components: {
    cHeader,
    cFooter,
    bubble,
    coins,
    coupons,
    gifts,
    goods,
    records
  },
  computed: {
    showRecordBtn () {
      if (this.current === 0) {
        return this.score > 0 && this.hasRecord
      } else if (this.current === 1) {
        return this.coupon > 0
      } else if (this.current === 2) {
        return this.prize > 0
      }
    },
    isLogin () {
      return store.state.isLogin
    },
    token () {
      return store.state.token
    }
  },
  watch: {
    token (token) {
      if (token !== '') {
        this.getData()
      }
    }
  },
  data () {
    return {
      nums: 0,
      score: 0,
      coupon: 0,
      prize: 0,
      current: 0,
      key: '',
      hasRecord: true,
      hash: {
        score: 0,
        coupon: 1,
        gift: 2
      }
    }
  },

  methods: {
    getData () {
      getAction('/userapi/user/show').then(res => {
        if (res.code === 0) {
          this.score = res.data.score
          this.coupon = res.data.coupon_nums
          this.prize = res.data.prize_nums
          setTimeout(() => {
            this.move(this.key === '' ? 'normal' : 'scroll')
          }, 500)
        }
      })
    },
    numsMove (val, type = 'normal', delay = 0) {
      if (type === 'normal') {
        this.nums = val
      } else {
        const obj = {
          x: 0
        }
        TweenMax.to(obj, 0.7, {
          x: val,
          delay,
          onComplete: () => {
            this.nums = parseInt(obj.x)
          },
          onUpdate: (e) => {
            this.nums = obj.x.toFixed(0)
          }
        })
      }
    },
    change (e) {
      this.current = e.mp.detail.current
      if (this.key === '') {
        this.move()
      }
    },
    move (type = 'normal') {
      if (this.current === 0) {
        this.numsMove(this.score, type, 1.5)
        if (this.$refs.score) {
          if (this.key === 'score') {
            this.$refs.score.drop()
            store.commit('SET_MOVEICON', '')
            this.key = ''
          } else {
            this.$refs.score.shake()
          }
        }
      } else if (this.current === 1) {
        this.numsMove(this.coupon, type)
        this.$refs.coupon.shake()
      } else if (this.current === 2) {
        this.numsMove(this.prize, type)
        this.$refs.gift.shake()
      }
    },
    toRecord () {
      let url = ''
      if (this.current === 0) {
        this.$refs.records.show()
        return
      } else if (this.current === 1) {
        url = '/pages/personal/coupon/main?status=used'
      } else if (this.current === 2) {
        url = '/pages/personal/gift/main?status=used'
      }
      mpvue.navigateTo({
        url
      })
    },
    openScan () {
      mpvue.scanCode({
        success: res => {
          console.log('scan res', res)
          if (res.path.startsWith('pages/index/main?scene')) {
            const s = res.path.split('scene')
            this.toQrresult(s[1].substr(1, s[1].length - 1))
          }
        }
      })
    },
    toQrresult (scene) {
      const keys = {
        'A': 'score',
        'B': 'coupon',
        'C': 'gift'
      }
      const key = scene.substr(0, 1)
      const code = scene.substr(1, scene.length - 1)
      console.log('key:', keys[key], ';code:', code)
      store.commit('SET_MOVEICON', '')
      mpvue.navigateTo({
        url: `/pages/scan/main?key=${keys[key]}&code=${code}`
      })
    },
    recordLoad (e) {
      this.hasRecord = e !== 0
    }
  },
  onShow () {
    if (this.$refs.goods) {
      this.$refs.goods.hide()
    }
    const moveIcon = store.state.moveIcon
    console.log('moveIcon', moveIcon)
    if (moveIcon !== '') {
      this.current = this.hash[moveIcon]
      this.key = moveIcon
      this.getData()
    }
  },
  onLoad (options) {
    console.log('onLoad index2', options)
    Object.assign(this.$data, this.$options.data())
    // this.key = options.key
    // this.current = this.hash[this.key]
    // if (options.key === undefined) {
    //   this.current = 0
    // }
    // options.scene = 'Cf9cd723468db2206e3dc22b6b692'
    if (options.scene) {
      const scene = decodeURIComponent(options.scene)
      console.log('scene', scene)
      this.toQrresult(scene)
    }
    if (this.isLogin) {
      this.getData()
    }
  }
}
</script>
