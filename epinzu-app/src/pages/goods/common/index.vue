<template>
  <view class="goods">
    <!-- 产品列表 -->
    <view class="goods-list mt24 mb24">
      <view class="goods-item" v-for="item in dataSource" :key="item.id" @tap="toDetail(item.id)">
        <c-image :src="imgSrc + item.cover" mode="aspectFill" class="img" />
        <view class="info">
          <view class="h3 mb8">
            <view class="c-tag" v-if="item.how_new === 100">全新</view>
            <view class="c-tag" v-else>{{item.how_new / 10}}成新</view>
            {{item.title}}</view>
          <view class="f10 c-999" :style="{'opacity': item.type === 1 ? '1' : '0'}">押金：￥{{item.deposit_min}}</view>
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
import { pageMixin } from '@/mixins/pages'
import CImage from '@/c/common/CImage'

export default {
  name: 'Index',
  mixins: [pageMixin],
  components: {
    CImage
  },
  data () {
    return {
      url: {
        list: '',
        newest: '/userapi/goods/rank/newest'
      }
    }
  },
  methods: {
    toDetail (id) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
      })
    }
  },
  onLoad (options) {
    console.log('goods common options', options)
    this.url.list = this.url[options.key]
    if (options.key === 'newest') {
      Taro.setNavigationBarTitle({
        title: '新品动态'
      })
    }
  }
}
</script>
