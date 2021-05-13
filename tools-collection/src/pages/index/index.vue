<style scoped>
.index-banner { width: 100%; height: 300px; }
.index-banner img { width: 100%; height: 300px; }
.title { margin: 32px 0 62px 0; font-size: 36px; font-weight: bold; }
.title img { width: 34px; margin-left: 20px; }

.tool-item2 { width: 212px; text-align: center; }
.tool-item2 img { width: 212px; height: 294px; margin-bottom: 30px; }

.rec-list { margin: 0 -20px 40px -20px; overflow-x: auto; }
.rec-list .tool-item { margin-left: 20px; margin-right: 20px; }
.rec-frame { display: flex; }
view, input {
    font-size: 30rpx;
}
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

      <div class="tool-list rec-list">
        <div class="rec-frame" :style="{width: (list1.length * 180) + 'rpx'}">
          <a :href="item.href" class="tool-item" v-for="item in list1" :key="id">
            <img :src="imgSrc + item.imgpath" mode="aspectFill" />
            <div>{{item.name}}</div>
          </a>
        </div>
      </div>
    </div>
    <div v-for="i in list2" :key="index">
      <div class="hr20 mb20"></div>
      <div class="title acenter" style="margin-left: 30rpx;">
        <span>{{i.cname}}</span>
      </div>
      <div class="tool-list" style="flex-wrap: wrap;">
        <a :href="item.href" class="tool-item" v-for="(item, i2) in i.list" :key="id">
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
import { formatUrl } from '@/utils'
import config from '@/config'
import store from '@/store'
const { imgSrc, tokenKey } = config

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
        if (res.ret === 0) {
          console.log(res.data)
          this.banner = res.data.banner
          this.list1 = formatUrl(res.data.tj_list)
          // this.list2 = formatUrl(res.data.list)
          res.data.cate_list.forEach(i => {
            i.list = formatUrl(i.sub)
          })
          this.list2 = res.data.cate_list
        }
      })
    }
  },

  onShareAppMessage () {
    return {
      title: '工具大全',
      path: '/pages/index/main'
    }
  },
  onLoad () {
    // let app = getApp()
    if (store.state[tokenKey] === '') {
      const app = getApp()
      app.loginCallback = () => {
        this.getData()
      }
    } else {
      this.getData()
    }
  }
}
</script>
