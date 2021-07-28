<template>
  <view class="goods">
    <view class="opera-top">
      <!-- 搜索 -->
      <view class="ml12 mr16 pt4 pb4 between" v-if="from === 'search'">
        <search :disabled="true" ref="search" style="width: 308px;" @tap="goBack" />
        <button class="btn-cart">
          <image src="@/img/cart.png" mode="widthFix" />
          <view v-if="cartNum > 0">{{cartNum}}</view>
        </button>
      </view>
      <!-- 分类列表 -->
      <view class="pr" v-if="from === 'cate'">
        <cates v-model="queryParams.cid" :list="cateList" @change="resetLoad" />
        <button class="btn-cate-more" @tap="openCate"><image src="@/img/ar2.png" mode="widthFix" class="w10" /></button>
      </view>
      <!-- 标签栏 -->
      <Tabs :list="tabs" @change="tabChange" />
    </view>
    <!-- 分类列表 展开 -->
    <cates2 ref="cates" v-model="queryParams.cid" :list="cateList" @change="resetLoad"  />
    <!-- 产品列表 -->
    <view class="goods-list mt96 mb24">
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
    <view class="empty-txt" v-if="ipage.loadOver">已经全部加装完毕</view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import search from '@/c/common/search'
import Tabs from '@/c/common/Tabs'
import cates from './modules/cates'
import cates2 from './modules/cates2'
import { pageMixin } from '@/mixins/pages'
import { getAction } from '@/utils/api'

export default {
  name: 'Index',
  mixins: [pageMixin],
  components: {
    search,
    Tabs,
    cates,
    cates2
  },
  data () {
    return {
      tabs: [
        { key: 'all', label: '综合', url: '123' },
        { key: 'sale', label: '销量', url: '1234' },
        { key: 'price', label: '价格', type: 'filter', url: '12345' }
      ],
      from: '',
      cartNum: 0,
      queryParams: {
        shop_type: 0,
        type: 1,
        cid: 0,
        word: '',
        lng: '',
        lat: ''
      },
      cateList: [{ cid: 0, cname: '全部' }],
      url: {
        list: '/userapi/goods/rank/recommend',
        all: '/userapi/goods/rank/recommend',
        sale: '/userapi/goods/rank/sales',
        price: '/userapi/goods/rank/price'
      }
    }
  },
  methods: {
    tabChange (e) {
      console.log('tabChange', e)
      if (typeof e === 'object') {
        this.url.list = this.url[e.key]
        this.queryParams.orderby = e.sort
      } else {
        this.url.list = this.url[e]
        this.$delete(this.queryParams, 'orderby')
      }
      this.resetLoad()
    },
    openCate () {
      if (this.cateList.length === 1) {
        return
      }
      this.$refs.cates.show()
    },
    goBack () {
      Taro.navigateBack({
        delta: -1
      })
    },
    toDetail (id) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
      })
    },
    getCartNum () {
      getAction('/userapi/shopping/counts').then(res => {
        if (res.code === 0) {
          this.cartNum = res.data
        }
      })
    },
    getCateList () {
      getAction('/userapi/goods/cate/children', {
        cid: this.queryParams.cid
      }).then(res => {
        if (res.code === 0) {
          this.cateList = this.cateList.concat(res.data)
        }
      })
    }
  },
  onShow () {
    this.$nextTick(() => {
      if (this.from === 'search') {
        this.$refs.search.setDefault(this.queryParams.word)
      }
    })
    if (this.from === 'search' && this.isLogin) {
      this.getCartNum()
    }
    if (this.from === 'cate') {
      this.getCateList()
    }
  },
  onLoad (options) {
    console.log('goods list options', options)
    this.queryParams.word = options.keyword
    this.from = options.from || 'search'
    this.queryParams.cid = options.cid || 0
    this.cateList[0].cid = options.cid || 0
    if (options.cname) {
      Taro.setNavigationBarTitle({
        title: options.cname
      })
    }
  }
}
</script>
