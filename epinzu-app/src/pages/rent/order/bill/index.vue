<template>
  <view class="Rent container">
    <!-- 订单信息 -->
    <view class="bg-fff pl12 mb8">
      <view class="h52 between borderB">
        <view>已支付押金</view>
        <view class="mr12"><text class="f12">￥</text>{{counts.goods_deposit}}</view>
      </view>
      <view class="h52 between borderB">
        <view>每日租金</view>
        <view class="mr12"><text class="f12">￥</text>{{counts.rent_day_amount}}</view>
      </view>
      <view class="h52 between borderB">
        <view>起租天数</view>
        <view class="mr12">{{counts.rent_day_min}}天</view>
      </view>
      <view class="h52 between borderB">
        <view>实际租赁天数</view>
        <view class="mr12">{{counts.rent_days}}天</view>
      </view>
      <view class="h52 between borderB">
        <view>
          <view>应付租金</view>
          <view class="f12 c-999">系统结算应该支付的租金</view>
        </view>
        <view class="mr12"><text class="f12">￥</text>{{counts.rent_amount}}</view>
      </view>
      <view class="h52 between borderB">
        <view>
          <view>应退押金</view>
          <view class="f12 c-999">系统结算应该退还的押金</view>
        </view>
        <view class="mr12"><text class="f12">￥</text>{{counts.remain_deposit}}</view>
      </view>
      <view class="h52 between borderB">
        <view>
          <view>实际退还金额</view>
          <view class="f12 c-999">退还金额到余额账户中</view>
        </view>
        <view class="mr12 c-red"><text class="f12">￥</text>{{counts.real_back_deposit}}</view>
      </view>
    </view>
    <!-- 结算说明 -->
    <view class="bg-fff mbb pl12 pr12 ovh mb8" v-if="counts.content && counts.images.length > 0">
      <view class="mt8 mb8">结算说明</view>
      <view class="hint-box f12 c-999 mb8" v-if="counts.content">{{counts.content}}</view>
      <view class="img-list">
        <view class="img-item" v-for="src in counts.images" :key="src">
          <image :src="imgSrc + src" mode="aspectFill" @tap="preview(imgSrc + src)" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../../index.styl'
import { getAction } from '@/utils/api'

export default {
  name: 'Index',
  data () {
    return {
      imgSrc: Taro.imgSrc,
      id: '',
      counts: {}
    }
  },
  methods: {
    getData () {
      Taro.showLoading({
        title: '加载中'
      })
      getAction('/userapi/rent/back/bill', {
        id: this.id
      }).then(res => {
        Taro.hideLoading()
        if (res.code === 0) {
          this.counts = res.data.counts
        }
      })
    },
    preview (src) {
      Taro.previewImage({
        urls: [src]
      })
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>
