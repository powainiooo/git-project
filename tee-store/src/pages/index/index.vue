<style>
.index-page { height: 100vh; overflow: hidden; position: relative; }
.index-swiper { width: 100%; height: calc(100vh - 104px - 272px); }
.swiper-sec { height: 100%; }
.index-page .line1 { width: 100%; position: absolute; top: 0; left: 0; padding: 22px 25px 0 32px; }
.index-page .line1 .l img { width: 80px; }
.index-page .line1 .l p { font-size: 100px; color: #41372D; line-height: 118px; }
.swiper-sec .icons { width: 100%; height: 100%; padding-top: 176px; display: flex; justify-content: center; align-items: center; }
.swiper-sec .icons .pig { height: 63%; display: block; }
.swiper-sec .icons .pig .img { height: 100%; }
.swiper-sec .icons .coupon { height: 41%; display: block; }
.swiper-sec .icons .coupon .img { height: 100%; }
.swiper-sec .icons .gift { height: 53%; display: block; }
.swiper-sec .icons .gift .img { height: 100%; }
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
          <coins :nums="score" />
        </swiper-item>
        <swiper-item>
          <coupons :nums="coupon" />
        </swiper-item>
        <swiper-item>
          <gifts :nums="prize" />
        </swiper-item>
      </swiper>

      <goods />
    </div>
    <c-footer />
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
    goods
  },
  computed: {
    showRecordBtn () {
      if (this.current === 0) {
        return this.score > 0
      } else if (this.current === 1) {
        return this.coupon > 0
      } else if (this.current === 2) {
        return this.prize > 0
      }
    }
  },
  data () {
    return {
      nums: 0,
      score: 200,
      coupon: 100,
      prize: 50,
      current: 0,
      key: 'score',
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
        }
      })
    },
    numsMove (val) {
      const obj = {
        x: 0
      }
      TweenMax.to(obj, 0.6, {
        x: val,
        onComplete: () => {
          this.nums = parseInt(obj.x)
        },
        onUpdate: (e) => {
          this.nums = obj.x.toFixed(1)
        }
      })
    },
    change (e) {
      this.current = e.mp.detail.current
      if (this.current === 0) {
        this.numsMove(this.score)
      } else if (this.current === 1) {
        this.numsMove(this.coupon)
      } else if (this.current === 2) {
        this.numsMove(this.prize)
      }
    },
    toRecord () {
      let url = ''
      if (this.current === 0) {
        url = '/pages/personal/points/main?page=detail'
      } else if (this.current === 1) {
        url = '/pages/personal/coupon/main?status=used'
      } else if (this.current === 2) {
        url = '/pages/personal/gift/main'
      }
      mpvue.navigateTo({
        url
      })
    },
    openScan () {
      mpvue.scanCode({
        success (res) {
          console.log('scanCode success', res)
        }
      })
    }
  },
  onShow () {
    this.getData()
  },
  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    this.key = options.key || 'score'
    this.current = this.hash[this.key]
  }
}
</script>
