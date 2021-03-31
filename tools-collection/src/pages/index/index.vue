<style scoped>
.index-banner { width: 100%; height: 300px; }
.index-banner img { width: 100%; height: 300px; }
.title { margin: 32px 0 62px 0; font-size: 36px; font-weight: bold; }
.title img { width: 34px; margin-left: 20px; }

.tool-item2 { width: 212px; text-align: center; }
.tool-item2 img { width: 212px; height: 294px; margin-bottom: 30px; }
</style>

<template>
  <div class="container">
    <swiper class="index-banner"
            autoplay
            indicator-dots
            indicator-active-color="#ffffff">
      <swiper-item>
        <view class="swiper-item"><img src="/static/images/img/img1.png" mode="aspectFill" /></view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item"><img src="/static/images/img/img1.png" mode="aspectFill" /></view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item"><img src="/static/images/img/img1.png" mode="aspectFill" /></view>
      </swiper-item>
    </swiper>

    <div class="ml30 mr30">
      <div class="title acenter">
        <span>今日推荐</span>
        <img src="/static/images/tuijian.png" mode="widthFix" />
      </div>

      <div class="between mb40">
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
      </div>

      <div class="between">
        <a href="#" class="tool-item2">
          <img src="/static/images/img/img2.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item2">
          <img src="/static/images/img/img2.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item2">
          <img src="/static/images/img/img2.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
      </div>
    </div>

    <c-footer />
  </div>
</template>

<script>
import cFooter from '@/components/footer1'

export default {
  components: {
    cFooter
  },
  data () {
    return {}
  },

  methods: {
  },

  created () {
    // let app = getApp()
  }
}
</script>
