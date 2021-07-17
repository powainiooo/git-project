<template>
  <view class="container index-container">
    <!-- 轮播图 -->
    <banner :list="banners" :guide="guide" v-if="page === 'index'" />
    <!-- 顶部栏 -->
    <view class="i-header"
          :class="{'i-header-anti': isAnti}"
          :style="{'background-color': bannerColor}">
      <!-- 搜索框 -->
      <view class="ml12 mr12 mb8" :style="{'margin-top': tH + 'px'}" @tap="toSearch">
        <search :disabled="true" placeholder="搜好物，上品租" :backgroundColor=" isAnti ? '#F5F5F5' : '#FFFFFF'" />
      </view>
      <!-- 产品分类 -->
      <cates :list="cates" @change="changeCate" />
    </view>

    <!-- 占位高度 -->
    <view class="height" :style="{'padding-top': tH + 'px'}" v-if="page === 'cate'"></view>

    <!-- 二级分类 -->
    <view class="second-cates" v-if="page === 'cate'">
      <view class="item" v-for="i in subCates" :key="i.cid" @tap="toList(i)">
        <image :src="imgSrc + i.cover" mode="aspectFill" class="img" />
        <view>{{i.cname}}</view>
      </view>
      <view class="item" @tap="toCates">
        <image src="@/img/more.png" mode="aspectFill" class="img" />
        <view>更多分类</view>
      </view>
    </view>

    <!-- 导航栏 -->
    <navs />

    <!-- 附近商品 -->
    <nearby :list="nearbys" />
    <!-- 新品动态 -->
    <news :list="newests" />
    <!-- 推荐商品 -->
    <guess-like class="mt24" :list="dataSource">
      <text slot="title">推荐商品</text>
    </guess-like>

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
import GuessLike from '@/c/common/GuessLike'
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
    news,
    GuessLike
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
      subCates: [],
      banners: [],
      nearbys: [],
      hots: [],
      newests: [],
      specias: [],
      guide: '',
      phone: '',
      page: 'index',
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
    getData () { // 获取首页数据
      Taro.showLoading({
        title: '加载中'
      })
      getAction('/userapi/index', this.lnglat).then(res => {
        Taro.hideLoading()
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
    getCateData () { // 获取分类数据
      Taro.showLoading({
        title: '加载中'
      })
      const params = {
        lng: this.lnglat.lng,
        lat: this.lnglat.lat,
        cid: this.currentCate.cid
      }
      getAction('/userapi/cate', params).then(res => {
        Taro.hideLoading()
        if (res.code === 0) {
          this.subCates = res.data.subCateList
          this.nearbys = res.data.nearbyGoodsList
          this.hots = res.data.hotGoodsList
          this.newests = res.data.newestGoodsList
          this.specias = res.data.specialList
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
      this.page = cate.cid === '' ? 'index': 'cate'
      this.currentCate = cate
      this.bannerColor = cate.color
      this.isAnti = false
      Taro.pageScrollTo({
        scrollTop: 0
      })
      if (this.page === 'index') {
        this.getData()
      } else {
        this.getCateData()
      }
    },
    toDetail (id) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
      })
    },
    toSearch () {
      Taro.navigateTo({
        url: '/pages/search/index'
      })
    },
    toCates () {
      Taro.navigateTo({
        url: `/pages/cate/index?cid=${this.currentCate.cid}`
      })
    },
    toList (cate) {
      Taro.navigateTo({
        url: `/pages/goods/list/index?cid=${cate.cid}&cname=${cate.cname}&from=cate`
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
