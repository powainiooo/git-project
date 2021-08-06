<template>
  <view class="Nearby">
    <view class="pl12 pr12 pt4 pb4 borderB" v-if="queryParams.word" @tap="goBack">
      <search ref="search" placeholder="搜好物，上品租" :disabled="true" />
    </view>
    <view class="goods-item-hor" v-for="item in dataSource" :key="item.goods_id" @tap="toDetail(item.goods_id)">
      <image :src="imgSrc + item.cover" mode="aspectFill" class="img" />
      <view class="infos">
        <view class="title mb4">{{item.title}}</view>
        <view class="acenter mb4" v-if="item.type === 1">
          <view class="c-red f10 mr16"><text class="f12">租金：</text>￥<text class="f12 bold">{{item.price_min}}</text>/天</view>
          <view class="f10"><text class="f12">押金：</text>￥<text class="f12 bold">{{item.deposit_min}}</text></view>
        </view>
        <view class="acenter mb4" v-else-if="item.type === 3">
          <view class="c-red f10"><text class="f12">售价：</text>￥<text class="f12 bold">{{item.price_min}}</text></view>
        </view>
        <view class="c-999 f12 mb22">距离{{item.distance}}公里</view>
        <view class="between">
          <view class="acenter" @tap.stop="toStore(item.shop_id)">
            <view class="c-tag c-tag-yel" v-if="item.shop_type === 1">个人</view>
            <view class="c-tag c-tag-red" v-else-if="item.shop_type === 2">企业</view>
            <view class="company">{{item.shop_name}}</view>
            <image src="@/img/ar1.png" mode="widthFix" class="w10" />
          </view>
          <view class="c-999 f12">{{item.type === 1 ? '已租' : '已售'}}：{{item.sale_nums > 9999 ? item.sale_nums + '+' : item.sale_nums}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import search from '@/c/common/search'
import { pageMixin } from '@/mixins/pages'

export default {
  name: 'Nearby',
  mixins: [pageMixin],
  components: {
    search
  },
  data () {
    return {
      queryParams: {
        cid: '',
        word: '',
        lng: '',
        lat: ''
      },
      url: {
        list: '',
        list1: '/userapi/nearby/search',
        list2: '/userapi/nearby/index',
      }
    }
  },
  onShow () {
    this.$nextTick(() => {
      if (this.queryParams.word) {
        this.$refs.search.setDefault(this.queryParams.word)
      }
    })
  },
  methods: {
    toDetail (id) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
      })
    },
    toStore (id) {
      Taro.navigateTo({
        url: `/pages/store/index?id=${id}`
      })
    },
    goBack () {
      Taro.navigateBack({
        delta: 1
      })
    }
  },
  onLoad (options) {
    console.log('nearby list options', options)
    this.queryParams.word = options.keyword
    if (options.keyword) {
      this.url.list = this.url.list1
    }
    if (options.cid !== undefined) {
      this.url.list = this.url.list2
      this.queryParams.cid = options.cid || 0
    }
  }
}
</script>
