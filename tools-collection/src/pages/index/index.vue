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
      <swiper-item v-for="item in banner" :key="id">
        <view class="swiper-item"><img :src="imgSrc + item.img" mode="aspectFill" /></view>
      </swiper-item>
    </swiper>

    <div class="ml30 mr30">
      <div class="title acenter">
        <span>今日推荐</span>
        <img src="/static/images/tuijian.png" mode="widthFix" />
      </div>

      <div class="between mb40">
        <a href="#" class="tool-item" v-for="item in list1" :key="id">
          <img :src="imgSrc + item.imgpath" mode="aspectFill" />
          <div>{{item.name}}</div>
        </a>
      </div>

      <div class="between">
        <a href="#" class="tool-item" v-for="item in list2" :key="id">
          <img :src="imgSrc + item.ad_image" mode="aspectFill" />
          <div>{{item.name}}</div>
        </a>
      </div>
    </div>

    <c-footer />
  </div>
</template>

<script>
import cFooter from '@/components/footer1'
import { postAction } from '@/utils/api'
import config from '@/config'
const { imgSrc } = config

export default {
  components: {
    cFooter
  },
  data () {
    return {
      imgSrc,
      banner: [],
      list1: [],
      list2: []
    }
  },
  methods: {
    getData () {
      postAction('index').then(res => {
        if (res.code === 1) {
          this.banner = res.data.banner
          this.list1 = res.data.jrtj
          this.list2 = res.data.ggt_gj
        }
      })
    }
  },

  onLoad () {
    // let app = getApp()
    this.getData()
  }
}
</script>
