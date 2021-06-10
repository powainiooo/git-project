<style>
.index-page { height: 100vh; overflow: hidden; position: relative; }
.index-swiper { width: 100%; height: calc(100vh - 104px - 272px); }
.swiper-sec { height: 100%; }
.swiper-sec .line1 { padding: 22px 25px 0 32px; }
.swiper-sec .line1 .l img { width: 80px; }
.swiper-sec .line1 .l p { font-size: 100px; color: #41372D; line-height: 118px; }
.swiper-sec .icons { width: 100%; height: calc(100% - 176px); display: flex; justify-content: center; align-items: center; }
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
    <div class="container">
      <swiper class="index-swiper"
              :current="current"
              indicator-dots
              indicator-color="#EADED0"
              indicator-active-color="#41372D"
              duration="300">
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
  data () {
    return {
      score: 0,
      coupon: 0,
      prize: 0,
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
    }
  },
  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    this.key = options.key || 'score'
    this.current = this.hash[this.key]
    this.getData()
  }
}
</script>
