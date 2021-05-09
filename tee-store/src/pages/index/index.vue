<style>
.index-swiper { width: 100%; height: calc(100vh - 104px - 272px); }
.swiper-sec { height: 100%; }
.swiper-sec .line1 { padding: 22px 25px 0 32px; }
.swiper-sec .line1 .l img { width: 80px; }
.swiper-sec .line1 .l p { font-size: 100px; color: #41372D; line-height: 118px; }
.swiper-sec .icons { width: 100%; height: calc(100% - 176px); display: flex; justify-content: center; align-items: center; }
.swiper-sec .icons .pig { height: 63%; display: block; }
.swiper-sec .icons .coupon { height: 41%; display: block; }
.swiper-sec .icons .gift { height: 53%; display: block; }
</style>

<template>
  <div class="page">
    <c-header menus />
    <bubble />
    <div class="container">
      <swiper class="index-swiper"
              indicator-dots
              indicator-color="#EADED0"
              indicator-active-color="#41372D"
              duration="300">
        <swiper-item>
          <coins />
        </swiper-item>
        <swiper-item>
          <coupons />
        </swiper-item>
        <swiper-item>
          <gifts />
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
    }
  },

  methods: {
  },

  created () {
  }
}
</script>
