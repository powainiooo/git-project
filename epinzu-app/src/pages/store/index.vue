<template>
  <view class="Store">
    <!-- 店铺信息 -->
    <view class="line1 between">
      <view class="flex mt8 mb8 ml12">
        <image :src="imgSrc + shopData.logo" mode="aspectFit" class="store-logo" />
        <view class="mt4">
          <view class="acenter">
            <text class="c-tag c-tag-yel mr4" v-if="shopData.type === 1">个人</text>
            <text class="c-tag c-tag-red mr4" v-if="shopData.type === 2">企业</text>
            {{shopData.shop_name}}
          </view>
          <view class="acenter">
            <rate :value="shopData.pf_avg" />
            <view class="f10 c-999 ml4">订单数: {{shopData.order_nums}}</view>
            <view class="f10 c-999 ml4">关注数: {{shopData.attention_nums}}</view>
          </view>
        </view>
      </view>
      <view class="mr12 mb8 mt8">
        <button class="c-btn c-btn-border c-btn-24" @tap="attention" v-if="attentionStatus === 0">关注店铺</button>
        <button class="c-btn c-btn-border c-btn-24" @tap="attention" v-else-if="attentionStatus === 1">取消关注</button>
        <button class="c-btn c-btn-border c-btn-24 mt4" @tap="contact">联系客服</button>
      </view>
    </view>
    <!-- 切换分类 -->
    <Tabs :list="tabs" :border="true" @change="tabChange" />
    <!-- 产品列表 -->
    <scroll-view :scrollY="true" class="mt8 scrolls">
      <view class="goods-list">
        <view class="goods-item" v-for="item in dataSource" :key="item.id" @tap="toDetail(item.id)">
          <image :src="imgSrc + item.cover" mode="aspectFill" class="img" />
          <view class="info">
            <view class="h3 mb8">
              <view class="c-tag" v-if="item.how_new === 100">全新</view>
              <view class="c-tag" v-else>{{item.how_new / 10}}成新</view>
              {{item.title}}</view>
            <view class="f10 c-999" :style="{'opacity': item.type === 1 ? '1' : '0'}">押金：￥{{item.deposit_min}}</view>
            <view class="between">
              <view class="price" v-if="item.type === 1">￥<text class="f14">{{item.price_min}}</text>/天</view>
              <view class="price" v-if="item.type === 3">￥<text class="f14">{{item.price_min}}</text></view>
              <view class="tag1" v-if="item.type === 1">{{item.rent_day_min}}天起租</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Rate from '@/c/common/Rate'
import Tabs from '@/c/common/Tabs'
import { pageMixin } from '@/mixins/pages'
import { getAction, intercept, postAction } from '@/utils/api'

export default {
  name: 'Index',
  mixins: [pageMixin],
  components: {
    Rate,
    Tabs
  },
  data () {
    return {
      tabs: [
        { key: 'newest', label: '最新好货' },
        { key: 'hot', label: '最受欢迎' },
        { key: '', label: '全部好货' }
      ],
      shopId: 0,
      attentionStatus: 0,
      shopData: {},
      queryParams: {
        orderby: 'newest'
      },
      url: {
        list: '/userapi/shop/goods/'
      }
    }
  },
  methods: {
    tabChange (e) {
      this.queryParams.orderby = e
      this.resetLoad()
    },
    getShopData () {
      getAction(`/userapi/shop/${this.shopId}`, this.lnglat).then(res => {
        if (res.code === 0) {
          this.shopData = res.data
        }
      })
    },
    toDetail (id) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
      })
    },
    // 关注店铺
    attention () {
      intercept(() => {
        postAction('/userapi/user/attention', {
          shop_id: this.shopId,
          action: this.attentionStatus === 0 ? 1 : 0
        }).then(res => {
          if (res.code === 0) {
            Taro.showToast({
              title: res.msg
            })
            this.getAttentionStatus()
          }
        })
      })
    },
    // 判断是否关注店铺
    getAttentionStatus () {
      getAction('/userapi/user/attention', {
        shop_id: this.shopId
      }).then(res => {
        if (res.code === 0) {
          this.attentionStatus = res.data
        }
      })
    },
    contact () {
      Taro.showToast({
        title: '联系客服'
      })
    }
  },
  onLoad (options) {
    this.shopId = options.id || 19
    this.url.list += this.shopId
    this.getShopData()
    if (this.isLogin) {
      this.getAttentionStatus()
    }
  }
}
</script>
