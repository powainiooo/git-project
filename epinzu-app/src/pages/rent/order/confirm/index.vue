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
          <image :src="imgSrc + src" mode="widthFix" class="aspectFill" />
        </view>
      </view>
    </view>
    <!-- 协商记录 -->
    <view class="bg-fff pl12" v-if="buttons.talk_logs === 1">
      <Cell title="协商记录" isLink @tap="toRecord" />
    </view>
    <!-- 申请平台介入 -->
    <view class="tc mt24 f12 c-999" @tap="toApply" v-if="buttons.ptjr_apply === 1">申请平台介入</view>
    <!-- 底部按钮 -->
    <view class="footer-container">
      <view class="wp100 pl12 pr12 between">
        <button class="c-btn mr8" @tap="handleConfirm">确认账单</button>
        <button class="c-btn c-btn-border2" @tap="toReject">拒绝账单</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../../index.styl'
import Cell from '@/c/common/Cell'
import { getAction, postAction } from '@/utils/api'

export default {
  name: 'Index',
  components: {
    Cell
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      id: '',
      counts: {},
      buttons: {}
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
          this.buttons = res.data.buttons
        }
      })
    },
    handleConfirm () {
      Taro.showModal({
        title: '提示',
        content: '是否确认账单？',
        success: res => {
          if (res.confirm) {
            postAction('/userapi/rent/back/bill', {
              id: this.id
            }).then(res => {
              if (res.code === 0) {
                Taro.showToast({
                  title: res.msg
                })
                Taro.navigateBack({
                  delta: 1
                })
              }
            })
          }
        }
      })
    },
    toApply () {
      Taro.navigateTo({
        url: `/pages/rent/apply?id=${this.id}`
      })
    },
    toReject () {
      Taro.navigateTo({
        url: `/pages/rent/order/reject/index?id=${this.id}`
      })
    },
    toRecord () {
      Taro.navigateTo({
        url: `/pages/rent/order/record/index?id=${this.id}`
      })
    }
  },
  onShow () {
    this.getData()
  },
  onLoad (options) {
    this.id = options.id
    this.returnId = options.returnId
  }
}
</script>
