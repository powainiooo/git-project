<template>
  <view class="container index-container">
    <!-- 轮播图 -->
    <banner :list="banners" :guide="guide" />
    <!-- 顶部栏 -->
    <view class="i-header"
          :class="{'i-header-anti': isAnti}"
          :style="{'background-color': bannerColor}">
      <!-- 搜索框 -->
      <view class="ml12 mr12 mb8" :style="{'margin-top': tH + 'px'}">
        <search :disabled="false" placeholder="搜好物，上品租" :backgroundColor=" isAnti ? '#F5F5F5' : '#FFFFFF'" />
      </view>
      <!-- 产品分类 -->
      <cates :list="cates" @change="changeCate" />
    </view>

    <!-- 导航栏 -->
    <navs />

    <!-- 附近商品 -->
    <nearby :list="nearbys" />
    <!-- 新品动态 -->
    <news :list="newests" />
    <!-- 推荐商品 -->
    <view class="i-title">
      <view class="h3">推荐商品</view>
    </view>
    <view class="goods-list">
      <view class="goods-item" v-for="item in dataSource" :key="item.id" @tap="toDetail(item.id)">
        <image :src="imgSrc + item.cover" mode="aspectFill" class="img" />
        <view class="info">
          <view class="h3 mb8">
            <view class="c-tag" v-if="item.how_new === 100">全新</view>
            <view class="c-tag" v-else>{{item.how_new / 10}}成新</view>
            {{item.title}}</view>
          <view class="f10 c-999" v-if="item.type === 1">押金：￥{{item.deposit_min}}</view>
          <view class="between">
            <view class="price" v-if="item.type === 1">￥<text class="f14">{{item.price_min}}</text>/天</view>
            <view class="price" v-if="item.type === 3">￥<text class="f14">{{item.price_min}}</text></view>
            <view class="f10 c-999" v-if="item.type === 1">已租：{{item.sale_nums}}</view>
            <view class="f10 c-999" v-if="item.type === 3">已售：{{item.sale_nums}}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <c-footer current="home" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import search from '@/c/common/search'
import cFooter from '@/c/common/footer'
import banner from './modules/banner'
import cates from './modules/cates'
import navs from './modules/navs'
import nearby from './modules/nearby'
import news from './modules/news'
import { getAction } from '@/utils/api'
import { pageMixin } from '@/mixins/pages'

export default {
  name: 'Index',
  mixins: [pageMixin],
  components: {
    banner,
    cFooter,
    search,
    cates,
    navs,
    nearby,
    news
  },
  computed: {
    lnglat () {
      return this.$store.state.lnglat
    }
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      tH: 0,
      bannerColor: 'transparent',
      isAnti: false,
      currentCate: {
        cid: '',
        color: ''
      },
      cates: [],
      banners: [],
      nearbys: [],
      hots: [],
      newests: [],
      specias: [],
      guide: '',
      phone: '',
      url: {
        list: '/userapi/goods/rank/recommend'
      }
    }
  },
  mounted() {
    console.log('index', this)
    Taro.getSystemInfo({
      success: res => {
        console.log('getSystemInfo', res)
        this.tH = res.statusBarHeight + res.titleBarHeight
      }
    })
  },
  methods: {
    getData () {
      getAction('/userapi/index', this.lnglat).then(res => {
        if (res.code === 0) {
          this.banners = res.data.bannerList
          this.nearbys = res.data.nearbyGoodsList
          this.hots = res.data.hotGoodsList
          this.newests = res.data.newestGoodsList
          this.specias = res.data.specialList
          this.guide = res.data.openshopguide
          this.phone = res.data.servicePhone
        }
      })
    },
    getCates () {
      getAction('/userapi/goods/cate/big').then(res => {
        if (res.code === 0) {
          this.cates = res.data
        }
      })
    },
    changeCate (cate) {
      this.currentCate = cate
      this.bannerColor = cate.color
      this.isAnti = false
      Taro.pageScrollTo({
        scrollTop: 0
      })
    },
    toDetail (id) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
      })
    }
  },
  onPageScroll (e) {
    if (this.currentCate.cid !== '') return
    if (e.scrollTop > 120) {
      this.bannerColor = '#ffffff'
      this.isAnti = true
    } else {
      this.bannerColor = 'rgba(255, 255, 255, 0)'
      this.isAnti = false
    }
  },
  onLoad (options) {
    console.log('index options', options)
    this.getData()
    this.getCates()
  }
}
</script>
