<template>
  <view class="Detail container">
    <!-- 顶部导航 -->
    <view class="Detail-header" id="header">
      <view class="tab-frame">
        <Tabs :value="tabKey" :list="tabs" :border="true" @change="tabChange" />
      </view>
      <view class="btns acenter">
        <button class="btn-cart">
          <image src="@/img/cart.png" mode="widthFix" />
          <text>2</text>
        </button>
        <button class="btn-cart ml8">
          <image src="@/img/share.png" mode="widthFix" />
        </button>
      </view>
    </view>
    <!-- 轮播图 -->
    <banner />
    <!-- 商品信息 -->
    <infos @coupon="openCoupons" />
    <!-- 价格信息 -->
    <view class="Detail-section">
      <price-item />
      <price-item />
    </view>
    <!-- 店铺信息 -->
    <stores />
    <!-- 租赁信息 -->
    <rents />
    <!-- 常见问题 -->
    <questions />
    <!-- 常见问题 -->
    <params @params="$refs.paramsList.show()" />
    <!-- 物品详情 -->
    <c-details />
    <!-- 相似物品 -->
    <guess-like class="mt24">
      <text slot="title">相似物品</text>
    </guess-like>
    <!-- 购买弹窗 -->
    <buys ref="buys" />
    <!-- 优惠券弹窗 -->
    <coupons ref="coupons" />
    <!-- 参数弹窗 -->
    <params-list ref="paramsList" />
    <!-- 底部操作栏 -->
    <view class="footer-container Detail-footer">
      <view class="between ml12 mr20 btns">
        <button class="btn">
          <image src="@/img/store.png" mode="aspectFit" />
          <view>店铺</view>
        </button>
        <button class="btn">
          <image src="@/img/service.png" mode="aspectFit" />
          <view>客服</view>
        </button>
        <button class="btn">
          <image src="@/img/star1.png" mode="aspectFit" />
          <view>收藏</view>
        </button>
      </view>
      <button class="c-btn" disabled @tap="openBuys">立即下单</button>

      <view class="offline">该商品已下架</view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import banner from './modules/banner'
import infos from './modules/infos'
import priceItem from './modules/prices'
import stores from './modules/stores'
import rents from './modules/rents'
import questions from './modules/questions'
import params from './modules/params'
import cDetails from './modules/details'
import buys from './modules/buys'
import coupons from './modules/coupons'
import paramsList from './modules/paramsList'
import GuessLike from '@/c/common/GuessLike'
import Tabs from '@/c/common/Tabs'

export default {
  name: 'Detail',
  components: {
    banner,
    infos,
    priceItem,
    stores,
    rents,
    questions,
    params,
    cDetails,
    buys,
    coupons,
    paramsList,
    GuessLike,
    Tabs
  },
  data () {
    return {
      tabs: [
        { key: 'goods', label: '商品' },
        { key: 'params', label: '参数' },
        { key: 'details', label: '详情' }
      ],
      tabKey: 'goods',
      dis: {
        goods: 0,
        params: 0,
        details: 0
      }
    }
  },
  methods: {
    tabChange (e) {
      this.tabKey = e
      Taro.pageScrollTo({
        scrollTop: this.dis[e]
      })
    },
    getSectionDis () {
      const query = Taro.createSelectorQuery()
      query.select('#header').boundingClientRect()
      query.select('#params').boundingClientRect()
      query.select('#details').boundingClientRect()
      query.selectViewport().exec(res => {
        const h = res[0].height
        this.dis.params = res[1].top - h
        this.dis.details = res[2].top - h
      })
    },
    openBuys () {
      this.$refs.buys.show()
    },
    openCoupons () {
      this.$refs.coupons.show()
    }
  },
  onShow () {
    setTimeout(() => {
      this.getSectionDis()
    }, 1000)
  },
  onPageScroll (e) {
    const st = e.scrollTop
    if (st < this.dis.params) {
      this.tabKey = 'goods'
    }
    if (st >= this.dis.params) {
      this.tabKey = 'params'
    }
    if (st >= this.dis.details) {
      this.tabKey = 'details'
    }
  }
}
</script>
